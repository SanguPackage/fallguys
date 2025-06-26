import { parse } from 'node-html-parser';
import { readFileSync, write, writeFileSync } from 'fs';

const data = readFileSync('./crown-ranks-table.html', 'utf8');
const root = parse(data);

type CrownLevel = {
    level: number;
    type: string;
    name: string;
    crowns: number;
    next: number;
    rarity: string;
    primary?: string;
    secondary?: string;
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

const rows = root.querySelectorAll('tr');

const result: CrownLevel[] = rows.slice(1).map(row => {
    const cells = row.querySelectorAll('td');

    const name = cells[1].text.trim();
    const type = cells[2].text.trim().toLowerCase().replace('costume ', '');

    const data: CrownLevel = {
        level: +cells[0].text,
        name,
        type,
        crowns: +cells[3].text,
        next: +cells[4].text,
        rarity: cells[5].text.trim().toLowerCase(),
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

writeFileSync('crownlevels.yml', yaml);

console.log('crownlevels.yml was written');
console.log('Paste the contents over _data/crownlevels.yml');
