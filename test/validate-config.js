var eslint = require('eslint')
var test = require('tape')

test('load config in eslint to validate all rule syntax is correct', function (t) {
  var CLIEngine = eslint.CLIEngine

  var cli = new CLIEngine({
    useEslintrc: false,
    configFile: 'eslintrc.json'
  })

  var codes = [
    'const foo = 1\nconst bar = function () {}\nbar(foo)\n',
    'async function foo () {}\nfoo()\n',
    'class Foo {}\nconst foo = new Foo()\nconst bar = function () {}\nbar(foo)\n',
    'const foo = () => {}\nfoo()\n'
  ];

  for (var i = 0; i < codes.length; i++) {
    t.ok(cli.executeOnText(codes[i]).errorCount === 0, 'cli.executeOnText(' + codes[i] + ')')
  }

  t.end()
})
