$(document).ready(function (){

    $('#tabRecentSellListings').on('click', function (){
        setTimeout(function (){
            let csgo_items = $("div[id^=\"listing_sell_new\"]:has(span:contains('Counter-Strike: Global Offensive'))")
            let dota_items = $("div[id^=\"listing_sell_new\"]:has(span:contains('Dota 2'))")
            $.each(csgo_items, function (){
                let item = $(this)
                if(item.is(':contains("Продано!")')){
                    return
                }
                let link = item.find('.market_listing_item_name_link').attr('href')
                let this_price = item.find('.market_listing_price_with_fee').text().trim().split(' ')[0]
                if (this_price.indexOf(',')>0){
                    this_price = this_price.replace(',','')
                }
                else{
                    this_price = this_price+'00'
                }
                let lowest_price = ''
                let item_name_id = ''
                let current_items = ''
                let buy_order = ''
                $.ajax({
                    url: link,
                    method: 'GET',
                    async:false,
                    success(doc){
                        item_name_id = doc.split('Market_LoadOrderSpread( ')[1].split(' ')[0]
                        $.ajax({
                            url: 'https://steamcommunity.com/market/itemordershistogram?country=RU&language=russian&currency=5&item_nameid='+item_name_id+'&two_factor=0',
                            method: 'GET',
                            async:false,
                            success(req){
                                lowest_price = req['lowest_sell_order']
                                current_items = req['sell_order_graph']
                                buy_order = req['highest_buy_order']
                                let length = lowest_price.length
                                if (length===2){
                                    if (parseFloat(lowest_price).toFixed(2)*0.87>this_price){
                                        item.css('background-color', 'rgba(0, 100, 0, 4)')
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Получу по низу: 0,"+parseFloat(lowest_price).toFixed(2)*0.87.toFixed(0)+" руб.</span>")
                                        if(buy_order>this_price){
                                            item.find('.market_listing_their_price').append("<span class=\"market_listing_price\" style=\"color: red\">Запрос: 0,"+buy_order+" руб.</span>")
                                        }
                                        else{
                                            item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Запрос: 0,"+buy_order+" руб.</span>")
                                        }
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Минимальная цена: 0,"+lowest_price+" руб.</span>")
                                        $.each(current_items, function (){
                                            item.append("<span class=\"market_listing_price\">"+$(this)[0]+" руб.     </span>")
                                        })
                                    }
                                    else{
                                        item.css('background-color', 'rgba(150, 0, 0, 0.2)')
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">0,"+lowest_price+" руб.</span>")
                                        $.each(current_items, function (){
                                            item.append("<span class=\"market_listing_price\">"+$(this)[0]+" руб.     </span>")
                                        })
                                    }
                                }
                                else {
                                    if (parseFloat(lowest_price).toFixed(2)*0.87>this_price){
                                        item.css('background-color', 'rgba(0, 100, 0, 0.4)')
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Получу по низу: "+parseFloat(lowest_price).toFixed(2)*0.87+" руб.</span>")
                                        if(buy_order>this_price){
                                            item.find('.market_listing_their_price').append("<span class=\"market_listing_price\" style=\"color: red\">Запрос: "+buy_order+" руб.</span>")
                                        }
                                        else{
                                            item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Запрос: "+buy_order+" руб.</span>")
                                        }
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Минимальная цена: "+lowest_price.substring(0,length-2)+","+lowest_price.substring(length-2,length)+" руб.</span>")
                                        $.each(current_items, function (){
                                            item.append("<span class=\"market_listing_price\">"+$(this)[0]+" руб.     </span>")
                                        })
                                    }
                                    else{
                                        item.css('background-color', 'rgba(150, 0, 0, 0.2)')
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">"+lowest_price.substring(0,length-2)+","+lowest_price.substring(length-2,length)+" руб.</span>")
                                        $.each(current_items, function (){
                                            item.append("<span class=\"market_listing_price\">"+$(this)[0]+" руб.     </span>")
                                        })
                                    }
                                }
                            }
                        })
                    }
                })
            })
            $.each(dota_items, function (){
                let item = $(this)
                if(item.is(':contains("Продано!")')){
                    return
                }
                let link = item.find('.market_listing_item_name_link').attr('href')
                let this_price = item.find('.market_listing_price_with_fee').text().trim().split(' ')[0]
                if (this_price.indexOf(',')>0){
                    this_price = this_price.replace(',','')
                }
                else{
                    this_price = this_price+'00'
                }
                let lowest_price = ''
                let item_name_id = ''
                let current_items = ''
                let buy_order = ''
                $.ajax({
                    url: link,
                    method: 'GET',
                    async:false,
                    success(doc){
                        item_name_id = doc.split('Market_LoadOrderSpread( ')[1].split(' ')[0]
                        $.ajax({
                            url: 'https://steamcommunity.com/market/itemordershistogram?country=RU&language=russian&currency=5&item_nameid='+item_name_id+'&two_factor=0',
                            method: 'GET',
                            async:false,
                            success(req){
                                lowest_price = req['lowest_sell_order']
                                current_items = req['sell_order_graph']
                                buy_order = req['highest_buy_order']
                                let length = lowest_price.length
                                if (length===2){
                                    if (parseFloat(lowest_price).toFixed(2)*0.87>this_price){
                                        item.css('background-color', 'rgba(0, 0, 100, 0.4)')
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Получу по низу: 0,"+parseFloat(lowest_price).toFixed(2)*0.87.toFixed(0)+" руб.</span>")
                                        if(buy_order>this_price){
                                            item.find('.market_listing_their_price').append("<span class=\"market_listing_price\" style=\"color: red\">Запрос: 0,"+buy_order+" руб.</span>")
                                        }
                                        else{
                                            item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Запрос: 0,"+buy_order+" руб.</span>")
                                        }
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Минимальная цена: 0,"+lowest_price+" руб.</span>")
                                        $.each(current_items, function (){
                                            item.append("<span class=\"market_listing_price\">"+$(this)[0]+" руб.     </span>")
                                        })
                                    }
                                    else{
                                        item.css('background-color', 'rgba(150, 0, 0, 0.2)')
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">0,"+lowest_price+" руб.</span>")
                                        $.each(current_items, function (){
                                            item.append("<span class=\"market_listing_price\">"+$(this)[0]+" руб.     </span>")
                                        })
                                    }
                                }
                                else {
                                    if (parseFloat(lowest_price).toFixed(2)*0.87>this_price){
                                        item.css('background-color', 'rgba(0, 0, 100, 0.4)')
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Получу по низу: "+parseFloat(lowest_price).toFixed(2)*0.87+" руб.</span>")
                                        if(buy_order>this_price){
                                            item.find('.market_listing_their_price').append("<span class=\"market_listing_price\" style=\"color: red\">Запрос: "+buy_order+" руб.</span>")
                                        }
                                        else{
                                            item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Запрос: "+buy_order+" руб.</span>")
                                        }
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">Минимальная цена: "+lowest_price.substring(0,length-2)+","+lowest_price.substring(length-2,length)+" руб.</span>")
                                        $.each(current_items, function (){
                                            item.append("<span class=\"market_listing_price\">"+$(this)[0]+" руб.     </span>")
                                        })
                                    }
                                    else{
                                        item.css('background-color', 'rgba(150, 0, 0, 0.2)')
                                        item.find('.market_listing_their_price').append("<span class=\"market_listing_price\">"+lowest_price.substring(0,length-2)+","+lowest_price.substring(length-2,length)+" руб.</span>")
                                        $.each(current_items, function (){
                                            item.append("<span class=\"market_listing_price\">"+$(this)[0]+" руб.     </span>")
                                        })
                                    }
                                }
                            }
                        })
                    }
                })
            })
        },2000)
    })
})












































// $(document).ready(function (){
//     function separate(inner_array, name){
//         let outer_array = [];
//         $.each(inner_array, function (){
//             if ($(this)[0].getElementsByClassName('market_listing_game_name')[0].innerText === name){
//                 outer_array.push($(this))
//             }
//         });
//         return outer_array
//     }
//
//     $('#tabRecentSellListings').on('click', function (){
//         setTimeout(function (){
//             let new_items = document.getElementById('sellListingRows').getElementsByClassName('market_listing_row');
//
//             let csgo_items = separate(new_items, 'Counter-Strike: Global Offensive')
//
//             let dota_items = separate(new_items, 'Dota 2')
//
//             $.each(csgo_items, function (){
//                 let name = $(this)[0].getElementsByClassName('market_listing_item_name_link')[0].innerText
//
//                 if (name.includes('Кейс') ||
//                     name.includes('кейс') ||
//                     name.includes('Капсула') ||
//                     name.includes('капсула') ||
//                     name.includes('Соперники') ||
//                     name.includes('Претенденты') ||
//                     name.includes('претенденты') ||
//                     name.includes('Легенды') ||
//                     name.includes('Гамма-кейс') ||
//                     name.includes('Case') ||
//                     name.includes('Наклейка') ||
//                     name.includes('Набор') ||
//                     name.includes('Ящик') ||
//                     name.includes('музыки') === true) {
//                     return;
//                 }
//
//                 let link = $(this)[0].getElementsByClassName('market_listing_item_name_link')[0].href
//                 let this_sell_price = $(this)[0].getElementsByClassName('market_listing_price_with_fee')[0].innerText
//                 let list_prices = []
//                 let type = ''
//
//                 if (this_sell_price === 'Продано!'){
//                     return;
//                 }
//
//                 $.ajax({
//                     method: 'GET',
//                     url: link,
//                     async: false,
//                     success: function (responce){
//                         if ($(responce).find('.market_commodity_orders_interior').length > 0){
//                             type = 0
//                         }
//                         else {
//                             list_prices = $(responce).find('.market_listing_price_with_fee')
//                             type = 1
//                         }
//                     },
//                 });
//
//                 if (type === 0){
//                     return
//                 }
//
//                 let lowest_sell_price;
//
//                 if (list_prices[0].innerText.trim() !== 'Продано!') {
//                     lowest_sell_price = list_prices[0].innerText
//                 } else {
//                     if (list_prices[1].innerText.trim() !== 'Продано!') {
//                     lowest_sell_price = list_prices[1].innerText
//                     } else {
//                         lowest_sell_price = list_prices[2].innerText
//                     }
//                 }
//
//                 let lowest_sell_price_without_fee = parseFloat(lowest_sell_price)*0.87
//
//                 try {
//                     if ((this_sell_price !== 'Продано!') && (type === 1)) {
//                         if ((parseFloat(lowest_sell_price_without_fee) < parseFloat(this_sell_price))) {
//                             $(this).find('.market_listing_price_with_fee').css('color', 'red');
//                         } else {
//                             $(this).find('.market_listing_price_with_fee').css('color', 'green');
//                         }
//                         $(this).append(list_prices.text())
//                         $(this).find('.market_table_value').append('<span>'+lowest_sell_price+' руб. </span><br>')
//                         $(this).find('.market_table_value').append('<span style="color: orange">'+lowest_sell_price_without_fee+' руб. </span>')
//                     }
//                 }
//                 catch{
//                     return
//                 }
//
//             });
//
//             $.each(dota_items, function (){
//                 let name = $(this)[0].getElementsByClassName('market_listing_item_name_link')[0].innerText
//
//                 let link = $(this)[0].getElementsByClassName('market_listing_item_name_link')[0].href
//                 let this_sell_price = $(this)[0].getElementsByClassName('market_listing_price_with_fee')[0].innerText
//                 let list_prices = []
//                 let type = ''
//
//                 if (this_sell_price === 'Продано!'){
//                     return;
//                 }
//
//                 $.ajax({
//                     method: 'GET',
//                     url: link,
//                     async: false,
//                     success: function (responce){
//                         if ($(responce).find('.market_commodity_orders_interior').length > 0){
//                             type = 0
//                         }
//                         else {
//                             list_prices = $(responce).find('.market_listing_price_with_fee')
//                             type = 1
//                         }
//                     },
//                 });
//
//                 if (type === 0){
//                     return
//                 }
//
//                 let lowest_sell_price;
//
//                 if (list_prices[0].innerText.trim() !== 'Продано!') {
//                     lowest_sell_price = list_prices[0].innerText
//                 } else {
//                     if (list_prices[1].innerText.trim() !== 'Продано!') {
//                     lowest_sell_price = list_prices[1].innerText
//                     } else {
//                         lowest_sell_price = list_prices[2].innerText
//                     }
//                 }
//
//                 let lowest_sell_price_without_fee = parseFloat(lowest_sell_price)*0.87
//
//                 if ((this_sell_price !== 'Продано!') && (type === 1)) {
//                     if ((parseFloat(lowest_sell_price_without_fee) < parseFloat(this_sell_price))) {
//                         $(this).find('.market_listing_price_with_fee').css('color', 'red');
//                     } else {
//                         $(this).find('.market_listing_price_with_fee').css('color', 'cyan');
//                     }
//                     $(this).append(list_prices.text())
//                     $(this).find('.market_table_value').append('<span>'+lowest_sell_price+' руб. </span><br>')
//                     $(this).find('.market_table_value').append('<span style="color: orange">'+lowest_sell_price_without_fee+' руб. </span>')
//                 }
//             });
//         }, 1500);
//     });
//
//     function addbutton(){
//         setTimeout(function (){
//             let items = document.getElementsByClassName('market_listing_row_link');
//
//             $.each(items, function (){
//                 if ($(this).find('.checkbutton').length > 0){
//
//                 }
//                 else {
//                     $(this).find('.market_listing_item_name_block').append('<button class="checkbutton" active><span>Получить цену автопокупки</span></button>')
//                 }
//             });
//         }, 1000)
//     }
//
//     if (window.location.pathname === '/market/search'){
//         addbutton();
//
//         $('span').on('click', function (){
//             addbutton();
//         });
//
//         $('.checkbutton').on('click', function (){
//            console.log('asd')
//         });
//     }
// });
//
// //
// // $('#tabRecentSellListings').on('click', function () {
// //     setTimeout(function () {
// //         let items = $('#sellListingRows').find(".market_listing_row");
// //         items.each(function (){
// //             if ($(this).find(".market_listing_game_name").text() === 'Counter-Strike: Global Offensive') {
// //                 let link = $(this).find(".market_listing_item_name_link").attr('href')
// //                 let response = '';
// //                 $.ajax({ type: "GET",
// //                              url: link,
// //                              async: false,
// //                              success : function(result)
// //                              {
// //                                  response = result;
// //                              }
// //                     });
// //
// //                 let price = $(response).find(".market_listing_price.market_listing_price_with_fee").first().text().replace('\t\t\t\t\t\t','').split(' ')[0]
// //
// //                 let currentprice = $(this).find(".market_listing_price_with_fee").text().replace('\t\t\t\t\t\t','').replace('\t\t\t\t\t','').replace('\n','').split(' ')[0]
// //
// //                 let items = $(response).find(".market_listing_price.market_listing_price_with_fee")
// //
// //                 if (currentprice === 'Продано!'){
// //
// //                 } else {
// //                     if ((parseFloat(price)*0.87) > (currentprice).toString().replace(',','.')){
// //                     $(this).find(".market_listing_their_price").append("<div style='display: flex; line-height: 1.25em;'><span id='withfee' style='color: green'>"+parseFloat(price)*0.87+" руб.</span> <span id='withoutfee' style='color: orange'>"+price+" руб.</span></div>>")
// //                     $(this).append(
// //                         $(response).find(".market_listing_price.market_listing_price_with_fee").text()
// //                     )
// //
// //                     } else {
// //                     $(this).find(".market_listing_their_price").append("<div style='display: flex; line-height: 1.25em;'><span id='withfee' style='color: red'>"+parseFloat(price)*0.87+" руб.</span> <span id='withoutfee' style='color: orange'>"+price+" руб.</span></div>")
// //
// //                 }
// //                 }
// //             }
// //         });
// //     }, 1000);
// // });
//
//
//
//
