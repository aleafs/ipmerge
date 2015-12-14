TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 5000
NPM_REGISTRY = 
NPM_INSTALL_PRODUCTION = PYTHON=`which python2.6` NODE_ENV=production npm install $(NPM_REGISTRY)
NPM_INSTALL_TEST = PYTHON=`which python2.6` NODE_ENV=test npm install $(NPM_REGISTRY)

MOCHA_OPTS =

init:
	@$(NPM_INSTALL_TEST)
	@ln -s -f ./pre-commit.sh .git/hooks/pre-commit

test: init
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

cov: init
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
		./node_modules/mocha/bin/_mocha -- -R spec
	
coveralls: init
	-NODE_ENV=test ./node_modules/.bin/istanbul cover \
		./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && \
		cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js --verbose

.PHONY: test
