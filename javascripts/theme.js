$(function(){
  /* 外部リンクは新規ウィンドウで開く */
  $("a.external").attr("target","_blank");
  $("a.help").attr("target","_blank");
  $("div#footer a[href^='http://www.redmine.org/']").attr("target","_blank");

  var lang = $("a.help").text() == "ヘルプ" ? "ja" : $("html").attr("lang");
  if (lang == "ja") {
    /* 言語が日本語のときはヘルプのリンク先をRedmine.JPの日本語訳にする */
    $("a.help").attr("href", "http://redmine.jp/guide/");

    /* コントローラー名とアクション名を取得 */
    $("body").attr("class").match(/controller-[\S]+/);
    var controllerName = RegExp.lastMatch;
    $("body").attr("class").match(/action-[\S]+/);
    var actionName = RegExp.lastMatch;

    /* 検索におけるスコープを検索ボックスのプレースホルダーに表示 */
    var placeholderText = "Redmine内を検索"
    var placeholderStrings = [
      {controller: "controller-issues", text: "チケットを検索"},
      {controller: "controller-news", text: "ニュースを検索"},
      {controller: "controller-documents", text: "文書を検索"},
      {controller: "controller-changesets", text: "更新履歴を検索"},
      {controller: "controller-wiki_pages", text: "Wikiページを検索"},
      {controller: "controller-messages", text: "メッセージを検索"}
    ];
    jQuery.each(placeholderStrings, function() {
      if (controllerName === this.controller) {
      	placeholderText = this.text;
      	return false;
      }
    });
    $("#quick-search input#q").attr("placeholder", placeholderText);

    if (controllerName === "controller-account") {
      $("#new_user").before("<p>このシステムを利用するためのユーザーアカウントを作成します。</p><p>下記項目を入力し送信ボタンをクリックしてください。確認のメールが届くので、メールの内容に従って登録を完了させてください。</p>");
      $("#new_user #user_login").after("<em class='info'>ログイン時に使用するユーザーID (例: fukuzawa)</em>");
      $("#new_user #user_password_confirmation").after("<em class='info'>パスワードを再入力してください</em>");
      $("#new_user #user_firstname").after("<em class='info'>氏名のうち 名 部分 (例: 諭吉)</em>");
      $("#new_user #user_lastname").after("<em class='info'>氏名のうち 姓 部分 (例: 福沢)</em>");

      $("#login-form").after("<p style='text-align: center;'>本システムのユーザーアカウントをお持ちで無い方は <a href='account/register/'><strong>登録</strong></a> をお願いします(所要時間 約1分)。</p><p style='text-align: center;'>お問い合わせの送信、対応状況の確認、お問い合わせ履歴の記録・参照 ができるようになります。</p>");
    }
  }
});
