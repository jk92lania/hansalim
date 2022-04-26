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


    // sale slide
    let sw_sale = new Swiper('.sw-sale', {
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
    });


    // copartner slide
    let sw_copartner = new Swiper('.sw-copartner', {
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
    });

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
    let group_focus = 0;
    let popular_section_bt = $('.popular-top .section-bt');
    // http request : 서버에 자료를 요청하는 것
    // http response : 서버에서 응답 오는 것
    fetch('https://jk92lania.github.io/hansalim/data.json')
    .then(res => res.json())
    .then(result => {
        for(let i = 0; i < result.length; i++){
            let data = result[i];
            data_title[i] = data.title;
            data_arr[i] = data.arr;
        }

        // 비동기로 데이터를 가져오기 때문에 정리가 끝나면 목록 출력
        p_change(data_arr[group_focus]);
        popular_section_bt.text(`${data_title[group_focus]} 더보기`);
    });


    // popul data
    let popular_data = [
        {
            title : '귀리(유/500g)',
            price : '5,800',
            img : 'good_cate01_01.jpg',
            cate : ['유기농'],
            link : '#',
            buy : '#',
            id : 1,
            tag : '인기',
            type : 1,
            group : 0
        },
        {
            title : '백미/유(2kg)',
            price : '9,100',
            img : 'good_cate01_02.jpg',
            cate : ['유기농'],
            link : '#',
            buy : '#',
            id : 2,
            tag : '인기',
            type : 1,
            group : 0
        },
        {
            title : '백미/유(4kg)',
            price : '17,900',
            img : 'good_cate01_03.jpg',
            cate : ['유기농'],
            link : '#',
            buy : '#',
            id : 3,
            tag : '인기',
            type : 0,
            group : 0
        },
        {
            title : '현미/유(2kg)',
            price : '8,650',
            img : 'good_cate01_04.jpg',
            cate : ['유기농'],
            link : '#',
            buy : '#',
            id : 4,
            tag : '인기',
            type : 1,
            group : 0
        },
        {
            title : '콩나물(300g)',
            price : '1,450',
            img : 'good_cate02_01.jpg',
            cate : [''],
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 1
        },
        {
            title : '브로콜리(350g)',
            price : '3,350',
            img : 'good_cate02_02.jpg',
            cate : [
                '유기농','무농약'
            ],
            link : '#',
            buy : '#',
            id : 6,
            tag : '인기',
            type : 1,
            group : 1
        },
        {
            title : '오이(3개)',
            price : '2,950',
            img : 'good_cate02_03.jpg',
            cate : [
                '유기농','무농약'
            ],
            link : '#',
            buy : '#',
            id : 7,
            tag : '인기',
            type : 1,
            group : 1
        },
        {
            title : '당근(1kg)',
            price : '3,500',
            img : 'good_cate02_04.jpg',
            cate : [
                '유기농','무농약'
            ],
            link : '#',
            buy : '#',
            id : 8,
            tag : '인기',
            type : 1,
            group : 1
        },
        {
            title : '딸기(500g)',
            price : '5,500',
            img : 'good_cate03_01.jpg',
            cate : ['유기농', '무농약'],
            link : '#',
            buy : '#',
            id : 9,
            tag : '인기',
            type : 1,
            group : 2
        },
        {
            title : '사과/유(1.5kg)',
            price : '10,900',
            img : 'good_cate03_02.jpg',
            cate : ['유기농'],
            link : '#',
            buy : '#',
            id : 10,
            tag : '인기',
            type : 1,
            group : 2
        },
        {
            title : '백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 2,
            group : 2
        },
        {
            title : '백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 2,
            group : 2
        },
        {
            title : '백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 2,
            group : 3
        },
        {
            title : '백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 2,
            group : 3
        },
        {
            title : '백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 2,
            group : 3
        },
        {
            title : '백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 2,
            group : 3
        },
        {
            title : '백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 4
        },
        {
            title : '백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 4
        },
        {
            title : '백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 4
        },
        {
            title : '백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 4
        },
        {
            title : '5-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 5
        },
        {
            title : '5-2백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 5
        },
        {
            title : '5-3백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 5
        },
        {
            title : '5-4백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 5
        },
        {
            title : '6-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 6
        },
        {
            title : '6-2백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 6
        },
        {
            title : '6-3백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 6
        },
        {
            title : '6-4백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 6
        },
        {
            title : '7-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 7
        },
        {
            title : '7-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 7
        },
        {
            title : '7-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 7
        },
        {
            title : '7-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 7
        },
        {
            title : '8-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 8
        },
        {
            title : '8-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 8
        },
        {
            title : '8-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 8
        },
        {
            title : '8-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 8
        },
        {
            title : '9-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 9
        },
        {
            title : '9-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 9
        },
        {
            title : '9-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 9
        },
        {
            title : '9-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 9
        },
        {
            title : '10-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 10
        },
        {
            title : '10-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 10
        },
        {
            title : '10-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 10
        },
        {
            title : '10-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 10
        },
        {
            title : '11-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 11
        },
        {
            title : '11-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 11
        },
        {
            title : '11-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 11
        },
        {
            title : '11-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 11
        },
        {
            title : '12-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 12
        },
        {
            title : '12-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 12
        },
        {
            title : '12-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 12
        },
        {
            title : '12-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 12
        },
        {
            title : '13-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 13
        },
        {
            title : '13-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 13
        },
        {
            title : '13-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 13
        },
        {
            title : '13-1백미/유(4kg)',
            price : '10,900',
            img : 'good.jpg',
            cate : '유기농',
            link : '#',
            buy : '#',
            id : 5,
            tag : '인기',
            type : 1,
            group : 13
        },
    ];

    let p_bottom = $('.popular-bottom');

    function p_change(_arr) {        
        let temp = '';
        for(let i = 0; i < _arr.length; i++) {
            let data = _arr[i];
            temp += `<a href="#" class="good-link">
                                <span class="good-img">
                                    <img src="images/${data.img}" alt="제품">`;
            if(data.type == 1) {
                temp += `<span class="good-tag">인기</span>`;
            }
            if(data.type == 2) {
                temp += `<span class="good-tag good-tag-red">알뜰</span>`;
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
        p_bottom.html(temp);
        p_bottom.find('a:first-child').css('margin-left', 0);
    }

    // popular tab slide 클릭시
    let popular_bt = $('.popular-bt');


    $.each(popular_bt, function(index, item){
        $(this).click(function(event){
            event.preventDefault();
            popular_bt.removeClass('popular-bt-focus');
            $(this).addClass('popular-bt-focus');
            group_focus = index;
            p_change(data_arr[group_focus]);

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
};