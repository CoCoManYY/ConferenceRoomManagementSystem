var moment = require('moment');

exports.getEmailHtml = (startTime,endTime,houseNumber,description,username)=>{
    const emailHtml = `  <style data-ac-keep="true">
    .ExternalClass {
        width: 100%;
        background: inherit;
        background-color: inherit;
    }
    
    .ExternalClass p,
    .ExternalClass ul,
    .ExternalClass ol {
        Margin: 0;
    }
    
    .undoreset div p,
    .undoreset p {
        margin-bottom: 20px;
    }
    </style>
    <div style="font:Verdana normal 14px;color:#000;">
    <div class="divbody"
        style="margin: 0px; outline: none; padding: 0px; color: #5D5D5D; font-family: arial; line-height: 1.1; width: 100%; background-color: #FFFFFF; background: #FFFFFF; text-align: center;">
        <table class="template-table" border="0" cellpadding="0" cellspacing="0" width="100%"
            style="font-size: 13px; min-width: auto; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; background: #FFFFFF;">
            <tbody style="background: rgba(195,234,222,0.5)">
                <tr>
                    <td align="center" valign="top" width="100%">
                        <table class="template-table" border="0" cellpadding="0" cellspacing="0" width="650"
                            bgcolor="#FFFFFF"
                            style="font-size: 13px; min-width: auto; mso-table-lspace: 0pt; mso-table-rspace: 0pt; max-width: 650px;">
                            <tbody>
                                <tr>
                                    <td id="layout_table_cc80da9b06cd000c56d700b13209593d72983ae1" valign="top"
                                        align="center" width="650">
                                        <table cellpadding="0" cellspacing="0" border="0"
                                            class="layout layout-table root-table" width="650"
                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tbody>
                                                <tr id="layout-row67" class="layout layout-row clear-this ">
                                                    <td id="layout-row-padding67" valign="top">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tbody>
                                                                <tr>
                                                                    <td id="layout_table_44ce02171addad7ea5c67d55f1307e5b006abe4e"
                                                                        valign="top" width="233"
                                                                        style="background-color: #4cc09c;">
                                                                        <table cellpadding="0" cellspacing="0"
                                                                            border="0" class="layout layout-table "
                                                                            width="233"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td id="layout-row-margin70"
                                                                                        valign="top">
                                                                                        <table width="100%"
                                                                                            border="0"
                                                                                            cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                            <tbody>
                                                                                                <tr id="layout-row70"
                                                                                                    class="layout layout-row widget _widget_spacer ">
                                                                                                    <td id="layout-row-padding70"
                                                                                                        valign="top">
                                                                                                        <table
                                                                                                            width="100%"
                                                                                                            border="0"
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td valign="top"
                                                                                                                        height="26">
                                                                                                                        <div class="spacer"
                                                                                                                            style="margin: 0; outline: none; padding: 0; height: 26px;">
                                                                                                                            <table
                                                                                                                                cellpadding="0"
                                                                                                                                cellspacing="0"
                                                                                                                                border="0"
                                                                                                                                width="100%"
                                                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td class="spacer-body"
                                                                                                                                            valign="top"
                                                                                                                                            height="26"
                                                                                                                                            width="233">
                                                                                                                                            &nbsp;
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </div>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td id="layout-row-margin57"
                                                                                        valign="top"
                                                                                        style="background-color: #4cc09c; padding: 0;">
                                                                                        <table width="100%"
                                                                                            border="0"
                                                                                            cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: initial !important;">
                                                                                            <tbody>
                                                                                                <tr id="layout-row57"
                                                                                                    class="layout layout-row widget _widget_text style57"
                                                                                                    style="margin: 0; padding: 0; background-color: #4cc09c;">
                                                                                                    <td id="layout-row-padding57"
                                                                                                        valign="top"
                                                                                                        style="background-color: #4cc09c; padding: 0px 0 30px 0;">
                                                                                                        <table
                                                                                                            width="100%"
                                                                                                            border="0"
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td id="text_div51"
                                                                                                                        class="td_text td_block"
                                                                                                                        valign="top"
                                                                                                                        align="left"
                                                                                                                        style="color: inherit; font-size: inherit; font-weight: inherit; line-height: 1; text-decoration: inherit; font-family: Arial;">
                                                                                                                        <div
                                                                                                                            style="margin: 0; outline: none; padding: 0; text-align: center;">
                                                                                                                            <a rel="webversion"
                                                                                                                                style="margin: 0px; outline: none; padding: 0px; color: rgb(255, 255, 255); text-decoration: inherit; font-family: verdana; font-size: inherit; font-weight: inherit; line-height: inherit;">
                                                                                                                              您有一份会议邀请待处理</a>
                                                                                                                        </div>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin65" valign="top">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tbody>
                                                                <tr id="layout-row65"
                                                                    class="layout layout-row widget _widget_spacer ">
                                                                    <td id="layout-row-padding65" valign="top">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" height="10">
                                                                                        <div class="spacer"
                                                                                            style="margin: 0; outline: none; padding: 0; height: 10px;">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                border="0"
                                                                                                width="100%"
                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="spacer-body"
                                                                                                            valign="top"
                                                                                                            height="10"
                                                                                                            width="650">
                                                                                                            &nbsp;
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin48" valign="top"
                                                        style="padding: 0px 0 0px 0;">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: initial !important;">
                                                            <tbody>
                                                                <tr id="layout-row48"
                                                                    class="layout layout-row widget _widget_spacer style48"
                                                                    style="">
                                                                    <td id="layout-row-padding48" valign="top"
                                                                        style="padding: 0;">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" height="13">
                                                                                        <div class="spacer"
                                                                                            style="margin: 0; outline: none; padding: 0; height: 13px;">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                border="0"
                                                                                                width="100%"
                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="spacer-body"
                                                                                                            valign="top"
                                                                                                            height="13"
                                                                                                            width="650"
                                                                                                            style="background-color: #c3eade;">
                                                                                                            &nbsp;
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin64" valign="top">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tbody>
                                                                <tr id="layout-row64"
                                                                    class="layout layout-row widget _widget_spacer ">
                                                                    <td id="layout-row-padding64" valign="top">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" height="10">
                                                                                        <div class="spacer"
                                                                                            style="margin: 0; outline: none; padding: 0; height: 10px;">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                border="0"
                                                                                                width="100%"
                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="spacer-body"
                                                                                                            valign="top"
                                                                                                            height="10"
                                                                                                            width="650">
                                                                                                            &nbsp;
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin49" valign="top">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tbody>
                                                                <tr id="layout-row49"
                                                                    class="layout layout-row widget _widget_spacer ">
                                                                    <td id="layout-row-padding49" valign="top">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" height="50">
                                                                                        <div class="spacer"
                                                                                            style="margin: 0; outline: none; padding: 0; height: 50px;">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                border="0"
                                                                                                width="100%"
                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="spacer-body"
                                                                                                            valign="top"
                                                                                                            height="50"
                                                                                                            width="650">
                                                                                                            &nbsp;
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin58" valign="top" style="padding: 0;">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: initial !important;">
                                                            <tbody>
                                                                <tr id="layout-row58"
                                                                    class="layout layout-row widget _widget_text style58"
                                                                    style="margin: 0; padding: 0;">
                                                                    <td id="layout-row-padding58" valign="top"
                                                                        style="padding: 0 26px 0 26px;">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td id="text_div52"
                                                                                        class="td_text td_block"
                                                                                        valign="top" align="left">
                                                                                        <div data-line-height="1.3">
                                                                                            <span
                                                                                                style="color: inherit; font-size: 30px; font-weight: inherit; line-height: inherit; text-decoration: inherit; font-family: verdana;"
                                                                                                class="">会议邀请函</span>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin50" valign="top">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tbody>
                                                                <tr id="layout-row50"
                                                                    class="layout layout-row widget _widget_spacer ">
                                                                    <td id="layout-row-padding50" valign="top">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" height="45">
                                                                                        <div class="spacer"
                                                                                            style="margin: 0; outline: none; padding: 0; height: 45px;">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                border="0"
                                                                                                width="100%"
                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="spacer-body"
                                                                                                            valign="top"
                                                                                                            height="45"
                                                                                                            width="650">
                                                                                                            &nbsp;
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin59" valign="top" style="padding: 0;">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: initial !important;">
                                                            <tbody>
                                                                <tr id="layout-row59"
                                                                    class="layout layout-row widget _widget_text style59"
                                                                    style="margin: 0; padding: 0;">
                                                                    <td id="layout-row-padding59" valign="top"
                                                                        style="padding: 0 26px 0 26px;">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td id="text_div53"
                                                                                        class="td_text td_block"
                                                                                        valign="top" align="left">
                                                                                        <div data-line-height="1.7">
                                                                                            <span
                                                                                                style="color: inherit; font-size: 16px; font-weight: inherit; line-height: inherit; text-decoration: inherit; font-family: verdana;"
                                                                                                class="">时间：${moment(
                                                                                                    startTime
                                                                                                  ).format("YYYY.MM.DD HH:mm")} - ${moment(
                                                                                                    endTime
                                                                                                  ).format("YYYY.MM.DD HH:mm")}</span>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                        <td id="layout-row-margin51" valign="top">
                                                                                            <table width="100%" border="0" cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                <tbody>
                                                                                                    <tr id="layout-row51"
                                                                                                        class="layout layout-row widget _widget_spacer ">
                                                                                                        <td id="layout-row-padding51" valign="top">
                                                                                                            <table width="100%" border="0"
                                                                                                                cellpadding="0" cellspacing="0"
                                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td valign="top" height="45">
                                                                                                                            <div class="spacer"
                                                                                                                                style="margin: 0; outline: none; padding: 0; height: 45px;">
                                                                                                                                <table cellpadding="0"
                                                                                                                                    cellspacing="0"
                                                                                                                                    border="0"
                                                                                                                                    width="100%"
                                                                                                                                    style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                                                    <tbody>
                                                                                                                                        <tr>
                                                                                                                                            <td class="spacer-body"
                                                                                                                                                valign="top"
                                                                                                                                                height="45"
                                                                                                                                                width="650">
                                                                                                                                                &nbsp;
                                                                                                                                            </td>
                                                                                                                                        </tr>
                                                                                                                                    </tbody>
                                                                                                                                </table>
                                                                                                                            </div>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                <tr>
                                                                                    <td id="text_div53"
                                                                                        class="td_text td_block"
                                                                                        valign="top" align="left">
                                                                                        <div data-line-height="1.7">
                                                                                            <span
                                                                                            style="color: inherit; font-size: 16px; font-weight: inherit; line-height: inherit; text-decoration: inherit; font-family: verdana;"
                                                                                            class="">
                                                                                            地点：${houseNumber} </span>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                        <td id="layout-row-margin51" valign="top">
                                                                                            <table width="100%" border="0" cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                <tbody>
                                                                                                    <tr id="layout-row51"
                                                                                                        class="layout layout-row widget _widget_spacer ">
                                                                                                        <td id="layout-row-padding51" valign="top">
                                                                                                            <table width="100%" border="0"
                                                                                                                cellpadding="0" cellspacing="0"
                                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td valign="top" height="45">
                                                                                                                            <div class="spacer"
                                                                                                                                style="margin: 0; outline: none; padding: 0; height: 45px;">
                                                                                                                                <table cellpadding="0"
                                                                                                                                    cellspacing="0"
                                                                                                                                    border="0"
                                                                                                                                    width="100%"
                                                                                                                                    style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                                                    <tbody>
                                                                                                                                        <tr>
                                                                                                                                            <td class="spacer-body"
                                                                                                                                                valign="top"
                                                                                                                                                height="45"
                                                                                                                                                width="650">
                                                                                                                                                &nbsp;
                                                                                                                                            </td>
                                                                                                                                        </tr>
                                                                                                                                    </tbody>
                                                                                                                                </table>
                                                                                                                            </div>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                <tr>
                                                                                    <td id="text_div53"
                                                                                        class="td_text td_block"
                                                                                        valign="top" align="left">
                                                                                        <div data-line-height="1.7">
                                                                                            <span
                                                                                            style="color: inherit; font-size: 16px; font-weight: inherit; line-height: inherit; text-decoration: inherit; font-family: verdana;"
                                                                                            class="">
                                                                                            会议描述：${description}</span>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                        <td id="layout-row-margin51" valign="top">
                                                                                            <table width="100%" border="0" cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                <tbody>
                                                                                                    <tr id="layout-row51"
                                                                                                        class="layout layout-row widget _widget_spacer ">
                                                                                                        <td id="layout-row-padding51" valign="top">
                                                                                                            <table width="100%" border="0"
                                                                                                                cellpadding="0" cellspacing="0"
                                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td valign="top" height="45">
                                                                                                                            <div class="spacer"
                                                                                                                                style="margin: 0; outline: none; padding: 0; height: 45px;">
                                                                                                                                <table cellpadding="0"
                                                                                                                                    cellspacing="0"
                                                                                                                                    border="0"
                                                                                                                                    width="100%"
                                                                                                                                    style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                                                    <tbody>
                                                                                                                                        <tr>
                                                                                                                                            <td class="spacer-body"
                                                                                                                                                valign="top"
                                                                                                                                                height="45"
                                                                                                                                                width="650">
                                                                                                                                                &nbsp;
                                                                                                                                            </td>
                                                                                                                                        </tr>
                                                                                                                                    </tbody>
                                                                                                                                </table>
                                                                                                                            </div>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                <tr>
                                                                                        <td id="text_div53"
                                                                                            class="td_text td_block"
                                                                                            valign="top" align="left">
                                                                                            <div data-line-height="1.7">
                                                                                                <span
                                                                                                style="color: inherit; font-size: 16px; font-weight: inherit; line-height: inherit; text-decoration: inherit; font-family: verdana;"
                                                                                                class="">
                                                                                                会议组织者： ${username}</span>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin51" valign="top">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tbody>
                                                                <tr id="layout-row51"
                                                                    class="layout layout-row widget _widget_spacer ">
                                                                    <td id="layout-row-padding51" valign="top">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" height="45">
                                                                                        <div class="spacer"
                                                                                            style="margin: 0; outline: none; padding: 0; height: 45px;">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                border="0"
                                                                                                width="100%"
                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="spacer-body"
                                                                                                            valign="top"
                                                                                                            height="45"
                                                                                                            width="650">
                                                                                                            &nbsp;
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin52" valign="top">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tbody>
                                                                <tr id="layout-row52"
                                                                    class="layout layout-row widget _widget_picture "
                                                                    align="center">
                                                                    <td id="layout-row-padding52" valign="top">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="image-td"
                                                                                        align="center" valign="top"
                                                                                        width="650">
                                                                                        <!-- <img
                                                                                            src="http://didibaba.imgus11.com/public/8281f0ff82bad337438382ae248042df.png?r=904697791"
                                                                                            width="122"
                                                                                            style="display: block; border: none; outline: none; width: 122px; opacity: 1; max-width: 100%;"> -->
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
             
                                                <tr>
                                                    <td id="layout-row-margin55" valign="top">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tbody>
                                                                <tr id="layout-row55"
                                                                    class="layout layout-row widget _widget_spacer ">
                                                                    <td id="layout-row-padding55" valign="top">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" height="48">
                                                                                        <div class="spacer"
                                                                                            style="margin: 0; outline: none; padding: 0; height: 48px;">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                border="0"
                                                                                                width="100%"
                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="spacer-body"
                                                                                                            valign="top"
                                                                                                            height="48"
                                                                                                            width="650">
                                                                                                            &nbsp;
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin56" valign="top">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tbody>
                                                                <tr id="layout-row56"
                                                                    class="layout layout-row widget _widget_button ">
                                                                    <td id="layout-row-padding56" valign="top">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="td_button td_block customizable"
                                                                                        valign="top" align="left"
                                                                                        width="650">
                                                                                        <div class="button-wrapper"
                                                                                            style="margin: 0; outline: none; padding: 0; text-align: center;">
                                                                                            <span
                                                                                                style="color:#ffffff;font-family:verdana;font-size:18px;">
                                                                                                <a 
                                                                                                href="http://localhost:3000/app/personalConferenceList?activeKey=3"
                                                                                                    style="margin: 0; outline: none; padding: 20px; color: #ffffff; background-color: #030303; border: 3px solid #030303; border-radius: 6px; font-family: verdana; font-size: 18px; display: inline-block; line-height: 1.1; text-align: center; text-decoration: none; mso-hide: all;"
                                                                                                    target="_blank">
                                                                                                    &nbsp;
                                                                                                    &nbsp;立即处理
                                                                                                    &nbsp;&nbsp;</a>
                                                                                            </span>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin63" valign="top">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tbody>
                                                                <tr id="layout-row63"
                                                                    class="layout layout-row widget _widget_spacer ">
                                                                    <td id="layout-row-padding63" valign="top">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td valign="top" height="90">
                                                                                        <div class="spacer"
                                                                                            style="margin: 0; outline: none; padding: 0; height: 90px;">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                border="0"
                                                                                                width="100%"
                                                                                                style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="spacer-body"
                                                                                                            valign="top"
                                                                                                            height="90"
                                                                                                            width="650">
                                                                                                            &nbsp;
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin62" valign="top">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tbody>
                                                                <tr id="layout-row62"
                                                                    class="layout layout-row widget _widget_break ">
                                                                    <td id="layout-row-padding62" valign="top"
                                                                        style="line-height: 0; mso-line-height-rule: exactly;">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; line-height: 0; mso-line-height-rule: exactly;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td height="29"
                                                                                        style="line-height: 0; mso-line-height-rule: exactly;">
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" height="1"
                                                                                        width="650"
                                                                                        style="line-height: 0; mso-line-height-rule: exactly;">
                                                                                        <table align="center"
                                                                                            border="0"
                                                                                            cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            height="1" width="650"
                                                                                            style="font-size: 13px; min-width: auto!important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; line-height: 0; mso-line-height-rule: exactly; width: 100%; max-width: 100%;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td class="break-line"
                                                                                                        bgcolor="#b8b8b8"
                                                                                                        height="1"
                                                                                                        width="650"
                                                                                                        style="line-height: 1px; mso-line-height-rule: exactly; height: 1px; width: 650px; background-color: #b8b8b8;">
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td height="29"
                                                                                        style="line-height: 0; mso-line-height-rule: exactly;">
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="layout-row-margin61" valign="top" style="padding: 0;">
                                                        <table width="100%" border="0" cellpadding="0"
                                                            cellspacing="0"
                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: initial !important;">
                                                            <tbody>
                                                                <tr id="layout-row61"
                                                                    class="layout layout-row widget _widget_text style61"
                                                                    style="margin: 0; padding: 0;">
                                                                    <td id="layout-row-padding61" valign="top"
                                                                        style="padding: 0 0 40px 0;">
                                                                        <table width="100%" border="0"
                                                                            cellpadding="0" cellspacing="0"
                                                                            style="font-size: 13px; min-width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td id="text_div55"
                                                                                        class="td_text td_block"
                                                                                        valign="top" align="left">
                                                                                        <div
                                                                                            data-line-height="2">
                                                                                            <span
                                                                                                style="color: #555555; font-size: 12px; font-weight: inherit; line-height: inherit; text-decoration: inherit;"
                                                                                                class=""><a rel="unsubscribe"
                                                                                                style="margin: 0px; outline: none; padding: 0px; color: rgb(85, 85, 85); text-decoration: inherit; font-size: inherit; font-weight: inherit; line-height: inherit;">本邮件由系统自动发送，请勿回复</a></span>
                                                                                            <br>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>`
    return  emailHtml;
}


