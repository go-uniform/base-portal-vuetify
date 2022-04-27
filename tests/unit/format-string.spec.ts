import { expect } from 'chai'
import {formatString} from '@/plugins/base/vuetify';

describe('formatString', () => {
  it('replaces placeholder within the given string with the given arguments', () => {
    const expected = 'This is a test';

    const input = '{0} is a {1}';
    const args = ['This', 'test'];
    const output = formatString(input, ...args);

    expect(output).to.eq(expected);
  })
})
