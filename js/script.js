$(document).ready(function () {

  $('#header_nav').on('click', function (ev) {
    let item = $(ev.target);
    if (item.hasClass('nav-item')) {
      $('.nav-item.nav-active').removeClass('nav-active');
      item.addClass('nav-active');
    }
  });

  // SERVICE SECTION
  (function () {
    function changeDescription(str) {
      $('#service_img').attr('src', `./img/services/${str}.jpg`);
      $('.service-description.display-block').removeClass('display-block');
      $(`[data-info="${str}"]`).addClass('display-block');
    }

    $('#services_list').on('click', function (ev) {
      let item = $(ev.target);
      $('.service-item.service-active').removeClass('service-active');
      item.addClass('service-active');
      changeDescription(item.text().replace(' ', '-').toLowerCase());
    });
  })();

// PHOTOS WORKS SECTION
  (function () {
    let arrPhotos = {
      'graphic-design': [1, 2, 3, 4],
      'landing-pages': [1, 2, 3],
      'web-design': [1, 2],
      'wordpress': [1, 2, 3]
    };
    let arrPhotosSecond = {
      'graphic-design': [5, 6, 7, 8],
      'landing-pages': [4, 5, 6],
      'web-design': [3, 4],
      'wordpress': [4, 5, 6]
    };
    let arrPhotosThird = {
      'graphic-design': [9, 10, 11, 12],
      'landing-pages': [7],
      'web-design': [7],
      'wordpress': [7, 8, 9, 10]
    };
    let loadMore = 0;

    let typeTransform = (str) => {
      let res = '';
      let arr = str.split('-');
      arr.forEach(function (item) {
        res += item[0].toUpperCase() + item.substring(1) + ' ';
      });
      return res.trim();
    };

    let createPhotoBlock = (src, type) => `
    <div class="work-img-block">
          <img class="work-img" src="${src}" alt="image">
          <div class="work-hover-block">
            <div class="work-hover-circles">
              <div class="circle-chain"></div>
              <div class="circle-find"></div>
            </div>
            <p class="creative-design font-bold">creative design</p>
            <p class="type-design">${typeTransform(type)}</p>
          </div>
        </div>`;

    let addPhotos = (obj) => {
      for (let key in obj) {
        obj[key].forEach(function (item) {
          $('#work_photos_block').append(createPhotoBlock(`./img/works-photos/${key}/${key + item}.jpg`, key));
        });
      }
    };

    let showPhotos = (type) => {
      let typesCollection = $('.type-design');

      for (let i = 0, length = typesCollection.length; i < length; i++) {

        if (typesCollection[i].innerHTML !== type) {
          $(typesCollection[i]).parents('div.work-img-block').hide(300);
        } else {
          $(typesCollection[i]).parents('div.work-img-block').show(300);
        }
        if (type === 'All') {
          $(typesCollection[i]).parents('div.work-img-block').show(300);
        }
      }
    };

    $('#works_list').on('click', function (ev) {
      let item = $(ev.target);
      if (item.hasClass('works-item')) {
        $('.works-item.work-active').removeClass('work-active');
        item.addClass('work-active');
        showPhotos(item.text());
      }
    });

    $('#load_more').on('click', function () {
      if (loadMore === 0) addPhotos(arrPhotosSecond);
      if (loadMore === 1) addPhotos(arrPhotosThird);
      loadMore++;
      if (loadMore === 2) $(this).hide(300);
    });
    addPhotos(arrPhotos);
  })();

// SLIDER SECTION
  (function () {
    let clickBlock = $('#slider_click_block');
    let sliderItems = $('#photos_line').children();

    function feedbackTransform(tag) {
      tag.addClass('display-block');
      let name = localStorage.getItem("name");
      let str = tag.text();
      let arr = str.split(' ');

      if (name) {
        $(`[data-feedback="${name}"]`).text(localStorage.getItem("text"));
      }

      localStorage.setItem("name", tag.attr('data-feedback'));
      localStorage.setItem("text", str);

      arr.length = 55;
      tag.text(`${arr.join(' ')} ...`).append('<span class="feedback-link font-bold"> >>> </span>');
    }

    localStorage.clear();
    feedbackTransform($('.feedback.display-block'));

    $('#slider').on('click', function (ev) {

      if ($(ev.target).hasClass('feedback-link')) {
        let feedback = `
        <div class="feedback-bg flex-align-center">
          <div class="full-feedback">
            <div class="full-feedback-close-btn"><i class="far fa-times-circle"></i></div>
            <p>${localStorage.getItem("text")}</p>
          </div>
        </div>`;

        $(this).append(feedback);
      }

      if ($(ev.target).closest('div').hasClass('full-feedback-close-btn')) {
        $('.feedback-bg').remove();
      }
    });

    clickBlock.on('click', function (ev) {
      let clickObj = $(ev.target);
      let mainPhoto = $('#main_photo');
      let photoLine = $('#photos_line');

      switch (true) {

        case clickObj.hasClass('slider-img'):
          $('.slider-img-border.slider-img-active').removeClass('slider-img-active');
          clickObj.parent().addClass('slider-img-active');
          mainPhoto.attr('src', clickObj.attr('src'));
          break;

        case clickObj.hasClass('left-button'):
          for (let i = 0, length = sliderItems.length; i < length; i++) {
            if ($(sliderItems[i]).hasClass('slider-img-active')) {
              $(sliderItems[i]).removeClass('slider-img-active');

              switch (i) {
                case 1:
                  photoLine.css('left', 0 + 'px');
                  break;
                case 2:
                  if (parseInt(photoLine.css('left')) < 0)
                    photoLine.css('left', -105 + 'px');
                  break;
                case 3:
                  if (parseInt(photoLine.css('left')) < -105)
                    photoLine.css('left', -210 + 'px');
                  break;
              }

              if (i === 0) {
                $(sliderItems[length - 1]).addClass('slider-img-active');
                mainPhoto.attr('src', $(sliderItems[length - 1]).children().attr('src'));
                photoLine.css('left', -315 + 'px');
              } else {
                $(sliderItems[i - 1]).addClass('slider-img-active');
                mainPhoto.attr('src', $(sliderItems[i - 1]).children().attr('src'));
              }

              break;
            }
          }
          break;

        case clickObj.hasClass('right-button'):
          for (let i = 0, length = sliderItems.length; i < length; i++) {
            if ($(sliderItems[i]).hasClass('slider-img-active')) {
              $(sliderItems[i]).removeClass('slider-img-active');


              switch (i) {
                case 3:
                  if (parseInt(photoLine.css('left')) === 0)
                    photoLine.css('left', -105 + 'px');
                  break;
                case 4:
                  if (parseInt(photoLine.css('left')) > -210)
                    photoLine.css('left', -210 + 'px');
                  break;
                case 5:
                  if (parseInt(photoLine.css('left')) > -315)
                    photoLine.css('left', -315 + 'px');
                  break;
              }

              if (i === length - 1) {
                $(sliderItems[0]).addClass('slider-img-active');
                mainPhoto.attr('src', $(sliderItems[0]).children().attr('src'));
                photoLine.css('left', 0 + 'px');
              } else {
                $(sliderItems[i + 1]).addClass('slider-img-active');
                mainPhoto.attr('src', $(sliderItems[i + 1]).children().attr('src'));
              }
              break;
            }
          }
          break;
      }
      let imgName = $('.slider-img-active').children().attr('src').split('/').pop();
      let name = imgName.substring(0, imgName.indexOf('.'));


      $('.feedback.display-block').removeClass('display-block');
      $('.writer-name.display-block').removeClass('display-block');
      $('.work-position.display-block').removeClass('display-block');
      feedbackTransform($(`[data-feedback="${name}"]`));
      $(`[data-name-writer="${name}"]`).addClass('display-block');
      $(`[data-work-position="${name}"]`).addClass('display-block');
    })
  })();
});