import { render } from 'preact';
import { Counter } from './counter.view';

const mountNode = document.createElement('div');
const appended = document.body.appendChild(mountNode);

render(<Counter />, appended);
