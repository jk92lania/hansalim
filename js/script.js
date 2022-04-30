$(document).ready(function () {

    // mymenu 펼침목록
    let mymenu_partner = $('#mymenu-partner');
    let arrow_list_mymenu = $('.arrow-list-mymenu');
    mymenu_partner.click(function(event){
        event.preventDefault();
        arrow_list_mymenu.toggle();
        arrow_list_event.hide();
        arrow_list_more.hide();
    });  
    
    // 참여 펼침목록
    let arrow = $('#arrow');
    let arrow_list_event = $('.arrow-list-event');
    arrow.click(function(event){
        event.preventDefault();
        arrow_list_event.toggle();
        arrow.toggleClass('arrow-active');
        more.removeClass('more-active');
        arrow_list_mymenu.hide();
        arrow_list_more.hide();
    }); 
    
    // 더보기 펼침목록
    let more = $('#more');
    let arrow_list_more = $('.arrow-list-more');
    more.click(function(event){
        event.preventDefault();
        arrow_list_more.toggle();

        let temp = more.hasClass('more-active');
        if (temp != true) {
            more.html('접기<i></i>');
        } else {
            more.html('더보기<i></i>');

        }

        more.toggleClass('more-active');
        arrow.removeClass('arrow-active');

        arrow_list_event.hide();
        arrow_list_mymenu.hide();
    }); 


    // 펼침기능
    let link_list = $('.link-list');
    let link_bt = $('.link-bt');
    link_bt.click(function () {
        link_list.stop().slideToggle(300);
    });

    // 위로가기 기능
    let gotop = $('.gotop');
    gotop.click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 500);
    });

    // header-top 사라짐 효과
    let header_main = $('.header-main');
    $(window).scroll(function () {
        let sc = $(window).scrollTop();
        if (sc >= 68) {
            header_main.addClass('header-main-active');
        } else {
            header_main.removeClass('header-main-active');
            
        }

    });


});


window.onload = function(){
    // 클론코드 관련 안내
    let modal_close = $('.modal-close');
    let modal = $('.modal');
    modal_close.click(function () {
        modal.stop().fadeOut(200);
    });

    
    // 전체물품    
    let all_menu_wrap = $('.all-menu-wrap');
    let all_list = $('.all-list');
    let all_list_cate_li = $('.all-list-cate li');
    let all_list_theme = $('.all-list-theme');
    let all_list_service = $('.all-list-service');
    
    let all_menu = $('.all-menu');
    let sub_list = $('.sub-list');
    all_list.niceScroll({
        cursoropacitymax: 0.3,
        cursorwidth: "7px",
        cursorborderradius: "10px",
    });
    console.log(sub_list);
    all_menu_wrap.mouseenter(function(){
        all_menu.show();
        all_menu.css('visibility', 'visible');
        $.each(all_list_cate_li, function(index, item){
            $(this).mouseenter(function(){
                sub_list.hide();
                let temp = all_menu.hasClass('all-menu-active');
                if(temp != true) {
                    all_menu.addClass('all-menu-active');
                }
                sub_list.eq(index).show();
            });            
        });
    });
    all_list_theme.mouseenter(function(){
        all_menu.removeClass('all-menu-active');
        sub_list.hide();
        
    });
    all_list_service.mouseenter(function(){
        all_menu.removeClass('all-menu-active');
        sub_list.hide();
        
    });
    all_menu_wrap.mouseleave(function(){
        all_menu.hide();
        all_menu.css('visibility', 'hidden');
        all_menu.removeClass('all-menu-active');
        sub_list.hide();
    });
    
    all_menu.css('height', 'calc(100vh - 300px)');
    
    


    // visual slide
    let sw_visual = new Swiper('.sw-visual', {
        loop : true,
        autoplay : {
            delay : 3000,
            disableOnInteraction: false,
        },
        speed : 1000,
        navigation : {
            prevEl : '.sw-visual-prev',
            nextEl : '.sw-visual-next',
        },
        pagination: {
            el : '.sw-visual-pg',
            type : 'fraction',
        },
    });
    
    let sw_visual_pause = $('.sw-visual-pause');
    sw_visual_pause.click(function(){
        let temp = $(this).hasClass('sw-visual-pause-active');
        if(temp != true) {
            $(this).addClass('sw-visual-pause-active');
            sw_visual.autoplay.stop();
        } else {
            $(this).removeClass('sw-visual-pause-active');
            sw_visual.autoplay.start();
        }
    });



    // copartner slide
    let sw_copartner_info = {
        slidesPerView : 3,
        spaceBetween : 10,
        slidesPerGroup : 3,
        navigation : {
            prevEl : '.sw-copartner-prev',
            nextEl : '.sw-copartner-next',
        },
        pagination : {
            el : '.sw-copartner-pg',
            type : 'fraction',
        },
    };

    // popular slide
    let sw_popular = new Swiper('.sw-popular', {
        slidesPerView : 7,
        spaceBetween : 10,
        slidesPerGroup : 7,
        navigation : {
            prevEl : '.sw-popular-prev',
            nextEl : '.sw-popular-next',
        },
    });
    
    // 카테고리별 데이터
    let data_arr = [];
    // 타이틀 데이터
    let data_title = [];    
    let arr_focus = 0;
    let data_total = 0;
    // 이 물품 어떠세요 물품 불러오기
    let r_total = 8;
    let r_random_id = [];
    let recommend_item = [];
    // 알뜰살품 불러오기
    let s_total = 12;
    let s_random_id = [];
    let sale_item = [];    
    let s_wrapper = $('.sw-sale .swiper-wrapper');
    
    // 조합원 추천물품 불러오기
    let c_total = 9;
    let c_random_id = [];
    let copartner_item = [];
    let c_wrapper = $('.sw-copartner .swiper-wrapper');


    // 중복되지 않는 난수 출력
    function makeRandom(_arr, _data_total, _total) {
        for(let i = 0; i < _total; i++) {
            let num = Math.floor(Math.random() * _data_total) + 1;
            if(_arr.indexOf(num) === -1) {
                _arr.push(num);
            } else {
                i--;
            }
        }
    }

    // 난수와 동일한 id를 가진 데이터 출력
    function makeItemList(_cate, _random_id, _items) {
        for(let j = 0; j < _cate.length; j++) {
            for(let k = 0; k < _random_id.length; k++) {
                if(_cate[j].id == _random_id[k]){
                    _items.push(_cate[j])
                }
            }            
        }
    }


    let popular_section_bt = $('.popular-top .section-bt');
    // http request : 서버에 자료를 요청하는 것
    // http response : 서버에서 응답 오는 것
    fetch('https://jk92lania.github.io/hansalim/data.json')
    .then(res => res.json())
    .then(result => {
        data_total = result.length * result[0].arr.length;
        makeRandom(r_random_id, data_total, r_total); 
        makeRandom(s_random_id, data_total, s_total); 
        makeRandom(c_random_id, data_total, c_total); 

        

        for(let i = 0; i < result.length; i++){
            let data = result[i];
            data_title[i] = data.title;
            data_arr[i] = data.arr;
            makeItemList(data_arr[i], r_random_id, recommend_item);
            makeItemList(data_arr[i], s_random_id, sale_item);
            makeItemList(data_arr[i], c_random_id, copartner_item);
        }

        // 비동기로 데이터를 가져오기 때문에 정리가 끝나면 목록 출력
        p_change(data_arr[arr_focus]);
        r_change(recommend_item);
        s_change(sale_item, s_wrapper);        
        let sw_sale = new Swiper('.sw-sale', sw_sale_info);
        s_change(copartner_item, c_wrapper);   
        let sw_copartner = new Swiper('.sw-copartner', sw_copartner_info);
        popular_section_bt.text(`${data_title[arr_focus]} 더보기`);
    });

    let r_wrap1 = $('.good-wrap-1');
    let r_wrap2 = $('.good-wrap-2');

    function r_change(_arr) {
        let r_top = [];
        let r_bot = [];
        let r_length = _arr.length / 2;
        for(let i = 0; i < _arr.length; i++) {
            if(i < r_length) {
                r_top[i] = _arr[i];
            }
            if (i >= r_length){
                r_bot.push(_arr[i]);                
            }
        }
        console.log(r_top);
        console.log(r_bot);
        r_wrap1.html(makeItem(r_top));
        r_wrap1.find('a:first-child').css('margin-left', 0);
        r_wrap2.html(makeItem(r_bot));
        r_wrap2.find('a:first-child').css('margin-left', 0);
    }

    
    function s_change(_arr, _wrapper) {
        let temp = '';
        for(let i = 0; i < _arr.length; i++) {
            let temp2 = [];
            temp2[0] = _arr[i];
            temp += `<div class="swiper-slide">`
            temp += makeItem(temp2);
            temp += `</div>`;
        }
        _wrapper.html(temp);
    }

    

    // sale slide
    sw_sale_info = {
        slidesPerView : 3,
        spaceBetween : 10,
        slidesPerGroup : 3,
        navigation : {
            prevEl : '.sw-sale-prev',
            nextEl : '.sw-sale-next',
        },
        pagination : {
            el : '.sw-sale-pg',
            type : 'fraction',
        },
    };
    

    let p_bottom = $('.popular-bottom');

    function p_change(_arr) { 
        
        p_bottom.html(makeItem(_arr));
        p_bottom.find('a:first-child').css('margin-left', 0);
    }

    function makeItem(_arr) {
        let temp = '';
        for(let i = 0; i < _arr.length; i++) {
            let data = _arr[i];
            temp += `<a href="#" class="good-link">
                                <span class="good-img">
                                    <img src="images/${data.img}" alt="제품">`;
            if(data.type == 1) {
                temp += `<span class="good-tag">${data.tag}</span>`;
            }
            if(data.type == 2) {
                temp += `<span class="good-tag good-tag-red">${data.tag}</span>`;
            }
                                
            temp += `</span>
    
                                <div class="good-info">`;

            if(data.cate) {
                if(data.cate[0] == "") {
                    
                } else {
                    temp += `<span class="good-cate">`;
                    for(let j = 0; j < data.cate.length; j++) {
                        console.log('cate leng' + data.cate);
                        
                        temp += `<em class="good-cate-txt">${data.cate[j]}</em>`;
                    }
                    temp += `</span>`;
                }
            }
    
            temp +=  `<span class="good-title">
                                        ${data.title}
                                    </span>
                                    <span class="good-price">
                                        <b>${data.price}</b>원
                                    </span>
                                </div>
                                <button class="good-cart"></button>
                            </a>`;
            
        }
        return temp;
    }

    // popular tab slide 클릭시
    let popular_bt = $('.popular-bt');


    $.each(popular_bt, function(index, item){
        $(this).click(function(event){
            event.preventDefault();
            popular_bt.removeClass('popular-bt-focus');
            $(this).addClass('popular-bt-focus');
            arr_focus = index;
            p_change(data_arr[arr_focus]);

            let temp = $(this).text();
            popular_section_bt.text(`${temp} 더보기`);
            
        })
    });

    // brand slide
    let sw_brand = new Swiper('.sw-brand', {
        slidesPerView : 3,
        spaceBetween : 10,
        slidesPerGroup : 1,
        navigation : {
            prevEl : '.sw-brand-prev',
            nextEl : '.sw-brand-next',
        },
        pagination : {
            el : '.sw-brand-pg',
            type : 'fraction',
        },
    });

    // banner slide
    let sw_banner = new Swiper('.sw-banner', {
        slidesPerView : 2,
        navigation : {
            prevEl : '.sw-banner-prev',
            nextEl : '.sw-banner-next',
        },
        loop : true,
        autoplay : {
            delay : 1000,
            disableOnInteraction: false,
        },
    });

    // review slide
    let sw_reivew = new Swiper('.sw-review', {
        slidesPerView : 3,
        spaceBetween : 10,
        slidesPerGroup : 3,
        navigation : {
            prevEl : '.sw-review-prev',
            nextEl : '.sw-review-next',
        },
        pagination : {
            el : '.sw-review-pg',
            type : 'fraction',
        },
    });


    // 공지사항, 물품소식 탭메뉴
    let notice_bt = $('.notice-menu button');
    let notice_list = $('.notice-wrap ul');


    $.each(notice_bt, function(index, item){
        $(this).click(function(){            
            notice_bt.removeClass('notice-menu-focus');
            $(this).addClass('notice-menu-focus');
            
            notice_list.removeClass('notice-list-focus');
            notice_list.eq(index).addClass('notice-list-focus');
            
        })
    });
};