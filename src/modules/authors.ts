// Copyright © 2022 Dpm Land. All Rights Reserved.

// Add here if you help to dpm
const AUTHORS_DPM = [
  ['TeoDev1611', 'twitter.com/TeoDev1611'],
  ['Jheyson Saavedra', 'github.com/jheysaav'],
];

// NOTE: Don't touch this if you are adding to the credits
// Table authors generator
import { Table } from 'mods/deps.ts';

export function GetAuthors() {
  new Table()
    .header(['Name', 'Social Media'])
    .body(AUTHORS_DPM)
    .border(true)
    .render();
}
