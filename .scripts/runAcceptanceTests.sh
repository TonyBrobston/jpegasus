#!/bin/sh

. ./.scripts/acceptanceTestFunctions.sh

buildJpegasusAndMakeJpegasusAvailableAsLink
cloneJpegasusDemoAndLinkJpegasus
runCypressAndTeardown
