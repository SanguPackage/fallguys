import { parse } from 'node-html-parser';
import { writeFileSync, existsSync } from 'fs';

const baseUrl = 'https://fallguysultimateknockout.fandom.com/';

async function getCrownRanks() {
    const response = await fetch(`${baseUrl}/wiki/Crown_Rank`);
    const html = await response.text();
    const root = parse(html);
    const table = root.querySelector('.table-progress-tracking');

    type CrownLevel = {
        level: number;
        type: string;
        name: string;
        crowns: number;
        next: number;
        rarity: string;
        primary?: string;
        secondary?: string;
        url: string;
        typeUrl: string;
    }

    const colours = [
        {name: 'Kingswood', primary: '#0C4011', secondary: '#C26700'},
        {name: 'Shimmering Sea', primary: '#0D447D', secondary: '#FE8800'},
        {name: 'Starlight', primary: '#302D2D', secondary: '#FF8800'},
        {name: 'Freezy Dream', primary: '#113C85', secondary: '#FF89AE'},
        {name: 'Crown Master', primary: '#FF8700', secondary: '#040002'},
        {name: 'Royal Carpet', primary: '#BE0006', secondary: '#FF8701'},
        {name: 'Untouchable', primary: '#FB8900', secondary: '#FFFDFA'},
        {name: 'Regal Purple', primary: '#760055', secondary: '#FF8C02'},
        {name: 'Bubblegum', primary: '#ff789a', secondary: '#49ebff'},
        {name: 'Mint Chocolate', primary: '#14ff62', secondary: '#5b292f'},
        {name: 'Coral Blue', primary: '#5dc9ee', secondary: '#de56f2'},
        {name: 'Traffic Light', primary: '#03ec65', secondary: '#ff2d3d'},
        {name: 'Night Sky', primary: '#0a1926', secondary: '#eae5d4'},
        {name: 'Orangeade', primary: '#ff6200', secondary: '#ffc700'},
    ];

    const rows = table.querySelectorAll('tr');

    const skipColumns = 1;

    const result: CrownLevel[] = rows.slice(2).map(row => {
        const cells = row.querySelectorAll('td');

        const name = cells[skipColumns + 1].text.trim();
        const type = cells[skipColumns + 2].text.trim().toLowerCase().replace('costume ', '');

        const data: CrownLevel = {
            level: +cells[skipColumns + 0].text,
            name,
            type,
            crowns: +cells[skipColumns + 3].text,
            next: +cells[skipColumns + 4].text,
            rarity: cells[skipColumns + 5].text.trim().toLowerCase(),
            url: baseUrl + cells[skipColumns + 1].querySelector('a').getAttribute('href'),
            typeUrl: baseUrl + cells[skipColumns + 2].querySelector('a').getAttribute('href'),
        }

        if (type === 'colour') {
            const colour = colours.find(x => x.name === name);
            if (colour) {
                data.primary = colour.primary;
                data.secondary = colour.secondary;
            } else {
                console.warn(`Could not find colour: ${name}`);
            }
        }

        return data;
    });

    //console.log('yaye', result);

    let yaml = '';
    result.forEach(row => {
        yaml += `- level: ${row.level}\n`;
        yaml += `  type: ${row.type}\n`;
        yaml += `  name: ${row.name}\n`;
        yaml += `  crowns: ${row.crowns}\n`;
        yaml += `  next: ${row.next}\n`;
        yaml += `  rarity: ${row.rarity}\n`;
        if (row.primary) {
            yaml += `  primary: "${row.primary}"\n`;
            yaml += `  secondary: "${row.secondary}"\n`;
        }
    });

    writeFileSync('../_data/crownlevels.yml', yaml);
    console.log('crownlevels.yml was written');


    console.log('Start downloading missing images');
    result.filter(row => row.type !== 'colour' && row.type !== 'nickname').forEach(async row => {
        const saveImgAsBase = `../img/crown-level-rewards/${row.type}-${row.name.toLowerCase().replace(/ /g, '-').replace(/,/g, '')}`;
        const saveImg = saveImgAsBase + '.png';
        const saveImgSm = saveImgAsBase + '-sm.png';
        if (!existsSync(saveImg)) {
            console.log(`Downloading BIG: ${row.name} (level: ${row.level})`);
            const response = await fetch(row.url);
            const html = await response.text();
            const root = parse(html);
            const image = root.querySelector('.pi-image img');
            const imageUrl = image.getAttribute('src');
            await downloadImage(imageUrl, saveImg);
        }

        if (!existsSync(saveImgSm)) {
            console.log(`Need to download SM: ${row.name} (level: ${row.level})`);
            console.log(`Do this manually at: ${row.typeUrl}`);
            console.log(`Save as: ${saveImgSm}`);
            console.log('-----');
            // const response = await fetch(row.typeUrl);
            // const html = await response.text();
            // const root = parse(html);
            // const image = root.querySelector(`td[data-sort-value='${row.name}'] img`);
            // const imageUrl = image.getAttribute('src');
            // await downloadImage(imageUrl, saveImg);
        }
    });
}

async function downloadImage(url: string, filepath: string) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    writeFileSync(filepath, Buffer.from(buffer));
}

getCrownRanks();
