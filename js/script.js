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