/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/* eslint-env mocha */

const GeolocationGatherer = require('../../../../gather/gatherers/dobetterweb/geolocation-on-start');
const assert = require('assert');
let geolocationGatherer;

describe('Geolocation gatherer', () => {
  // Reset the Gatherer before each test.
  beforeEach(() => {
    geolocationGatherer = new GeolocationGatherer();
  });

  it('returns an artifact', () => {
    return geolocationGatherer.beforePass({
      driver: {
        evaluateScriptOnLoad() {
          return Promise.resolve();
        }
      }
    }).then(_ => geolocationGatherer.afterPass({
      driver: {
        evaluateAsync() {
          return Promise.resolve(true);
        }
      }
    })).then(_ => {
      assert.strictEqual(geolocationGatherer.artifact, true);
    });
  });

  it('handles driver failure', () => {
    return geolocationGatherer.beforePass({
      driver: {
        evaluateScriptOnLoad() {
          return Promise.resolve();
        }
      }
    }).then(_ => geolocationGatherer.afterPass({
      driver: {
        evaluateAsync() {
          return Promise.reject('such a fail');
        }
      }
    })).then(_ => {
      assert.equal(geolocationGatherer.artifact, -1);
    });
  });
});
