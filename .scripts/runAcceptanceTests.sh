#!/bin/sh

. ./.scripts/acceptanceTestsFunctions.sh

buildJpegasusAndMakeJpegasusAvailableAsLink
cloneJpegasusDemoAndLinkJpegasus
runCypressAndTeardown
