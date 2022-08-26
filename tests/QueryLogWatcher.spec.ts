import {QueryLogWatcher} from "../src/QueryLogWatcher";

describe('QueryLogWatcher', function() {
    it('initial_test', function() {
        const queryLogWatcher = new QueryLogWatcher();
        expect(queryLogWatcher.driver).toBe('redis');
    });
});