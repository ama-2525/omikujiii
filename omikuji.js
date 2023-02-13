'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
        // 名前が空のときは処理を終了する
        return;
    }
    console.log(userName);
    
    // 診断結果表示エリアの作成
    resultDivided.innerText = '';
    
  // headerDivided の作成
  const headerDivided = document.createElement('div');
  headerDivided.setAttribute('class', 'card-header');
  headerDivided.innerText = '結果';

  // bodyDivided の作成
  const bodyDivided = document.createElement('div');
  bodyDivided.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName);
  paragraph.innerText = result;
  bodyDivided.appendChild(paragraph);

  // resultDivided に Bootstrap のスタイルを適用する
  resultDivided.setAttribute('class', 'card mx-auto');
  resultDivided.setAttribute('style', 'max-width: 700px;')

  // headerDivided と bodyDivided を resultDivided に差し込む
  resultDivided.appendChild(headerDivided);
  resultDivided.appendChild(bodyDivided);

    // ツイートエリアの作成
    /*tweetDivided.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue ='https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('おみくじ結果') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #おみくじ結果';

    tweetDivided.appendChild(anchor);*/

    // ツイートエリア(改)
    

    //入力フォームを削除し、もう一度引くボタンを表示
    const clear = document.getElementById('top-area');
    clear.style.display="none";
    const on = document.getElementById('one-more');
    on.classList.remove('off');
    on.addEventListener("click", function() {
        location.replace("/Users/amaaa/Desktop/school/omikujiii/omikuji.html");
    }, false);

    // widget.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
    if (event.key === 'Enter'){
        // TODO ボタンのonclick()処理を呼び出す
        assessmentButton.onclick();
    }
}

const answers = ['大吉','中吉','小吉','凶','大凶'];
const color = ['赤','黄色','青']

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i)
    }

    ///日付を取得
    let d = new Date();
    console.log(d);

    let month = d.getMonth() + 1;
    let day = d.getDate();

    // 文字のコード番号の合計の回答の数で割って添字の数値を求める
    const index = (sumOfCharCode+(month+day)) % answers.length
    const index2 = (sumOfCharCode+(month+day)) % color.length


    let result = '今日のあなたの運勢は' + answers[index] + '！ラッキーカラーは' + color[index2] + '！'

    result = result.replaceAll('{userName}', userName);


    if (index === 0){
        document.getElementById('ilust').src='omikuji_daikichi.png';
        document.getElementById('daikichi').play();
    } else if (index === 1){
        document.getElementById('ilust').src='omikuji_chuukichi.png';
    } else if (index === 2){
        document.getElementById('ilust').src='omikuji_syoukichi.png';
    } else if (index === 3){
        document.getElementById('ilust').src='omikuji_kyou.png';
    } else if (index === 4){
        document.getElementById('ilust').src='omikuji_daikyou.png';
        document.getElementById('daikyou').play();
    }

    return result;
}

// テストコード