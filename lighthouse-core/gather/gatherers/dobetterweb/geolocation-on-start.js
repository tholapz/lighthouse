/**
 * @license
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

/**
 * @fileoverview Captures calls to the gelocation on page load.
 */

'use strict';

const Gatherer = require('../gatherer');

class GeolocationOnStart extends Gatherer {

  beforePass(options) {
    this.collectCurrentPosUsage = options.driver.captureFunctionCallSites(
        'navigator.geolocation.getCurrentPosition');
    this.collectWatchPosUsage = options.driver.captureFunctionCallSites(
        'navigator.geolocation.watchPosition');
  }

  afterPass() {
    const promises = Promise.all([
      this.collectCurrentPosUsage(),
      this.collectWatchPosUsage()
    ]);

    return promises.then(results => {
      results = results.reduce((prev, curr) => {
        prev.push(...curr);
        return prev;
      }, []);
      this.artifact.usage = results;
    }, _ => {
      this.artifact = -1;
      return;
    });
  }
}

module.exports = GeolocationOnStart;
