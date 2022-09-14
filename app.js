$(document).ready(function (){
    function separate(inner_array, name){
        let outer_array = [];
        $.each(inner_array, function (){
            if ($(this)[0].getElementsByClassName('market_listing_game_name')[0].innerText === name){
                outer_array.push($(this))
            }
        });
        return outer_array
    }

    $('#tabRecentSellListings').on('click', function (){
        setTimeout(function (){
            let new_items = document.getElementById('sellListingRows').getElementsByClassName('market_listing_row');

            let csgo_items = separate(new_items, 'Counter-Strike: Global Offensive')

            let dota_items = separate(new_items, 'Dota 2')

            $.each(csgo_items, function (){
                let name = $(this)[0].getElementsByClassName('market_listing_item_name_link')[0].innerText

                if (name.includes('Кейс') ||
                    name.includes('кейс') ||
                    name.includes('Капсула') ||
                    name.includes('капсула') ||
                    name.includes('Соперники') ||
                    name.includes('Претенденты') ||
                    name.includes('претенденты') ||
                    name.includes('Легенды') ||
                    name.includes('Гамма-кейс') ||
                    name.includes('Case') ||
                    name.includes('Наклейка') ||
                    name.includes('Набор') ||
                    name.includes('Ящик') ||
                    name.includes('музыки') === true) {
                    return;
                }

                let link = $(this)[0].getElementsByClassName('market_listing_item_name_link')[0].href
                let this_sell_price = $(this)[0].getElementsByClassName('market_listing_price_with_fee')[0].innerText
                let list_prices = []
                let type = ''

                if (this_sell_price === 'Продано!'){
                    return;
                }

                $.ajax({
                    method: 'GET',
                    url: link,
                    async: false,
                    success: function (responce){
                        if ($(responce).find('.market_commodity_orders_interior').length > 0){
                            type = 0
                        }
                        else {
                            list_prices = $(responce).find('.market_listing_price_with_fee')
                            type = 1
                        }
                    },
                });

                if (type === 0){
                    return
                }

                let lowest_sell_price;

                if (list_prices[0].innerText.trim() !== 'Продано!') {
                    lowest_sell_price = list_prices[0].innerText
                } else {
                    if (list_prices[1].innerText.trim() !== 'Продано!') {
                    lowest_sell_price = list_prices[1].innerText
                    } else {
                        lowest_sell_price = list_prices[2].innerText
                    }
                }

                let lowest_sell_price_without_fee = parseFloat(lowest_sell_price)*0.87

                try {
                    if ((this_sell_price !== 'Продано!') && (type === 1)) {
                        if ((parseFloat(lowest_sell_price_without_fee) < parseFloat(this_sell_price))) {
                            $(this).find('.market_listing_price_with_fee').css('color', 'red');
                        } else {
                            $(this).find('.market_listing_price_with_fee').css('color', 'green');
                        }
                        $(this).append(list_prices.text())
                        $(this).find('.market_table_value').append('<span>'+lowest_sell_price+' руб. </span><br>')
                        $(this).find('.market_table_value').append('<span style="color: orange">'+lowest_sell_price_without_fee+' руб. </span>')
                    }
                }
                catch{
                    return
                }

            });

            $.each(dota_items, function (){
                let name = $(this)[0].getElementsByClassName('market_listing_item_name_link')[0].innerText

                let link = $(this)[0].getElementsByClassName('market_listing_item_name_link')[0].href
                let this_sell_price = $(this)[0].getElementsByClassName('market_listing_price_with_fee')[0].innerText
                let list_prices = []
                let type = ''

                if (this_sell_price === 'Продано!'){
                    return;
                }

                $.ajax({
                    method: 'GET',
                    url: link,
                    async: false,
                    success: function (responce){
                        if ($(responce).find('.market_commodity_orders_interior').length > 0){
                            type = 0
                        }
                        else {
                            list_prices = $(responce).find('.market_listing_price_with_fee')
                            type = 1
                        }
                    },
                });

                if (type === 0){
                    return
                }

                let lowest_sell_price;

                if (list_prices[0].innerText.trim() !== 'Продано!') {
                    lowest_sell_price = list_prices[0].innerText
                } else {
                    if (list_prices[1].innerText.trim() !== 'Продано!') {
                    lowest_sell_price = list_prices[1].innerText
                    } else {
                        lowest_sell_price = list_prices[2].innerText
                    }
                }

                let lowest_sell_price_without_fee = parseFloat(lowest_sell_price)*0.87

                if ((this_sell_price !== 'Продано!') && (type === 1)) {
                    if ((parseFloat(lowest_sell_price_without_fee) < parseFloat(this_sell_price))) {
                        $(this).find('.market_listing_price_with_fee').css('color', 'red');
                    } else {
                        $(this).find('.market_listing_price_with_fee').css('color', 'cyan');
                    }
                    $(this).append(list_prices.text())
                    $(this).find('.market_table_value').append('<span>'+lowest_sell_price+' руб. </span><br>')
                    $(this).find('.market_table_value').append('<span style="color: orange">'+lowest_sell_price_without_fee+' руб. </span>')
                }
            });
        }, 2000);
    });

    function addbutton(){
        setTimeout(function (){
            let items = document.getElementsByClassName('market_listing_row_link');

            $.each(items, function (){
                if ($(this).find('.checkbutton').length > 0){

                }
                else {
                    $(this).find('.market_listing_item_name_block').append('<button class="checkbutton" active><span>Получить цену автопокупки</span></button>')
                }
            });
        }, 1000)
    }

    if (window.location.pathname === '/market/search'){
        addbutton();

        $('span').on('click', function (){
            addbutton();
        });

        $('.checkbutton').on('click', function (){
           console.log('asd')
        });
    }
});

//
// $('#tabRecentSellListings').on('click', function () {
//     setTimeout(function () {
//         let items = $('#sellListingRows').find(".market_listing_row");
//         items.each(function (){
//             if ($(this).find(".market_listing_game_name").text() === 'Counter-Strike: Global Offensive') {
//                 let link = $(this).find(".market_listing_item_name_link").attr('href')
//                 let response = '';
//                 $.ajax({ type: "GET",
//                              url: link,
//                              async: false,
//                              success : function(result)
//                              {
//                                  response = result;
//                              }
//                     });
//
//                 let price = $(response).find(".market_listing_price.market_listing_price_with_fee").first().text().replace('\t\t\t\t\t\t','').split(' ')[0]
//
//                 let currentprice = $(this).find(".market_listing_price_with_fee").text().replace('\t\t\t\t\t\t','').replace('\t\t\t\t\t','').replace('\n','').split(' ')[0]
//
//                 let items = $(response).find(".market_listing_price.market_listing_price_with_fee")
//
//                 if (currentprice === 'Продано!'){
//
//                 } else {
//                     if ((parseFloat(price)*0.87) > (currentprice).toString().replace(',','.')){
//                     $(this).find(".market_listing_their_price").append("<div style='display: flex; line-height: 1.25em;'><span id='withfee' style='color: green'>"+parseFloat(price)*0.87+" руб.</span> <span id='withoutfee' style='color: orange'>"+price+" руб.</span></div>>")
//                     $(this).append(
//                         $(response).find(".market_listing_price.market_listing_price_with_fee").text()
//                     )
//
//                     } else {
//                     $(this).find(".market_listing_their_price").append("<div style='display: flex; line-height: 1.25em;'><span id='withfee' style='color: red'>"+parseFloat(price)*0.87+" руб.</span> <span id='withoutfee' style='color: orange'>"+price+" руб.</span></div>")
//
//                 }
//                 }
//             }
//         });
//     }, 1000);
// });




