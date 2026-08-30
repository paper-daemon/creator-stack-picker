# Usage metric boundary

Creator Stack Pickerのローカル利用回数は、ブラウザの`localStorage`へ保存します。

## 1クリック = 1 run

結果カードの件数や、広告候補の有無でrun数が増えてはいけません。`linkFor()`のような表示用helperは計測副作用を持たせず、診断ボタンのclick handlerで1回だけ`recordUsage('run')`します。

回帰fixtureでは`image`を選んだ状態で診断ボタンを2回実行し、次を確認します。

```text
1 click -> total 1 / run 1
2 clicks -> total 2 / run 2
```

```bash
node tests/test_usage.js
```

公開mainで4 assertions PASS。計測値はブラウザ内の利用回数であり、外部成果や売上を表す数字ではありません。
