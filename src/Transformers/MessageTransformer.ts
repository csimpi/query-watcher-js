import { generateTheme, highlight } from "prism-console";
import Prismjs from "prismjs";
import loadLanguages from 'prismjs/components/index.js';
import {MessageInterface} from "../Interfaces/MessageInterface";
import chalk from "chalk";

loadLanguages(['sql']);
const theme = generateTheme('code[class*=language-],pre[class*=language-]{color:#f92aad;text-shadow:0 0 2px #100c0f,0 0 5px #dc078e33,0 0 10px #fff3;background:0 0;font-family:Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background-color:transparent!important;background-image:linear-gradient(to bottom,#2a2139 75%,#34294f)}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.token.block-comment,.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#8e8e8e}.token.punctuation{color:#ccc}.token.attr-name,.token.deleted,.token.hexcode,.token.namespace,.token.number,.token.tag,.token.unit{color:#e2777a}.token.property,.token.selector{color:#72f1b8;text-shadow:0 0 2px #100c0f,0 0 10px #257c5575,0 0 35px #21272475}.token.function-name{color:#6196cc}.token.boolean,.token.function,.token.selector .token.id{color:#fdfdfd;text-shadow:0 0 2px #001716,0 0 3px #03edf975,0 0 5px #03edf975,0 0 8px #03edf975}.token.class-name{color:#fff5f6;text-shadow:0 0 2px #000,0 0 10px #fc1f2c75,0 0 5px #fc1f2c75,0 0 25px #fc1f2c75}.token.constant,.token.symbol{color:#f92aad;text-shadow:0 0 2px #100c0f,0 0 5px #dc078e33,0 0 10px #fff3}.token.atrule,.token.builtin,.token.important,.token.keyword,.token.selector .token.class{color:#2bda25;text-shadow:0 0 2px #393a33,0 0 8px #f39f0575,0 0 2px #f39f0575}.token.attr-value,.token.char,.token.regex,.token.string,.token.variable{color:#f87c32}.token.entity,.token.operator,.token.url{color:#67cdcc}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}.token.inserted{color:green}');

export class MessageTransformer {
    public static transform(message:MessageInterface):any[]
    {
        return [chalk.magenta.bgBlack.bold('['+message.data.queryModel.time+']'),...highlight(message.data.queryModel.sql, Prismjs.languages.sql, theme),message.data.queryModel.bindings];
    }
}