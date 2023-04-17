import { describe, it, expect } from 'vitest'
import {datetime, eachProp, truncate} from "@/utils/filters";

describe('truncate', () => {
    it('truncate properly', () => {
        const truncated = truncate('Hello world', 3);
        expect(truncated).eq('Hel...')
    })

    it('truncate properly with custom clamp', () => {
        const truncated = truncate('Hello world', 3, ',,,');
        expect(truncated).eq('Hel,,,')
    })
})

describe('datetime', () => {

    const date = '2022-03-02T08:47:10.000000Z';
    const providers = [
        {date: date, format: undefined, expected: 'March 2nd 2022, 3:47:10 pm'},
        {date: date, format: 'MMMM Do YYYY, h:mm:ss a', expected: 'March 2nd 2022, 3:47:10 pm'},
        {date: date, format: 'YYYY-MM-DD', expected: '2022-03-02'}
    ];

    providers.map(testCase => {
        it('print datetime ' + testCase.format, () => {
            expect(datetime(testCase.date, testCase.format)).eq(testCase.expected)
        })
    });
});

describe('eachProp', () => {
    it('filter property value', () => {
        const object = {name: 'hello', description: 'world'};
        const newObject = eachProp(object, v => v + '_test');

        expect(newObject.name).eq('hello_test');
        expect(newObject.description).eq('world_test');
    })

    it('filter property based on the property name', () => {
        const object = {name: 'hello', description: 'world'};
        const newObject = eachProp(object, (value, prop) => {
            if (prop === "description") {
                return value + '_test';
            }

            return value;
        });

        expect(newObject.name).eq(object.name);
        expect(newObject.description).eq('world_test');
    })
})