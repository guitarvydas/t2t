import * as fs from 'fs';
try {
    const argv = process.argv.slice(2);
    let srcFilename = argv[0];
    if ('-' == srcFilename) { srcFilename = 0 }
    let src = fs.readFileSync(srcFilename, 'utf-8');
    let parser = ohm.grammar (grammar);
    let cst = parser.match (src);
    let sem = parser.createSemantics ();
    sem.addOperation ('rwr', _rewrite);
    console.log (sem (cst).rwr ());
} catch (e) {
    console.error (e);
}

