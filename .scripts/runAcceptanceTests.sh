#!/bin/sh

. ./.scripts/acceptanceTestFunctions.sh

installCypress
buildJpegasusAndMakeJpegasusAvailableAsLink
cloneJpegasusDemoAndLinkJpegasus
runCypressAndSetupTeardown
