import { parse } from 'node-html-parser';
import { readFileSync, write, writeFileSync } from 'fs';

const data = readFileSync('./levels-table.html', 'utf8');
const root = parse(data);

type Level = {
    name: string;
    vaulted?: true;
    // exists: boolean;
    type: string;
    // sort_score: number;
    objective: string;
    howto: string;
    qualify: number;
    added: string;
    // timeout: string;
}

const existingLevels = readFileSync('../_data/levels.yml', 'utf-8');

const rows = root.querySelectorAll('tr');

const result: Level[] = rows.map(row => {
    const cells = row.querySelectorAll('td');

    const name = cells[1].text.trim();
    const type = cells[2].text.trim().toLowerCase();

    const data: Level = {
        name,
        type,
        objective: cells[3].text.trim().replace(/\n/g, ' '),
        howto: cells[4].text.trim().replace(/\n/g, ' '),
        qualify: +cells[6].text.trim().replace('%', ''),
        added: cells[7].text.trim().split('\n')[0].replace('Season ', ''),
    }

    if (type === 'final') {
        data.qualify = 1;
    }

    if (!existingLevels.includes(`- name: ${name}`)) {
        console.log(`Missing level: ${name}`);
        // TODO get icon from cells[0]
        // TODO: create _levels/data.name.html
    } else {
        return null;
    }

    return data;
});

// console.log('yaye', result);


let yaml = '';
result.filter(row => !!row).forEach(row => {
    yaml += `- name: ${row.name}\n`;
    yaml += `  exists: false\n`;
    yaml += `  type: ${row.type}\n`;
    yaml += `  sort_score: 0\n`;
    yaml += `  objective: ${row.objective}\n`;
    yaml += `  howto: ${row.howto}\n`;
    yaml += `  qualify: ${row.qualify}\n`;
    yaml += `  added: ${row.added}\n`;
    yaml += `  timeout: '0:00'\n`;
    yaml += '\n';
});

writeFileSync('levels.yml', yaml);

// console.log('levels.yml was written with the missing levels');
// console.log('Add the contents to _data/levels.yml');
