$(() => {
    var n;
    var people_array = [];


    $('#main').hide()
        //人數確定後
    $('#number_people').on('click', () => {
        //該清的清一清
        $('#people>form').empty()
        $('#main_row2').empty()
        $('#main').fadeOut(1000)

        //畫面滾動
        var target = $('#title');
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);

        //產生輸入名稱的地方
        n = +$('#input_number_people').val();
        for (let i = 0; i < n; i++) {


            $('#people>form').append('請輸入名稱：<input type="text" name="人名" class="col-sm-6" style="background-clip: padding-box;border: 1px solid #ced4da;border-radius: .25rem;"></br>')


        };
        $('#people').fadeIn(1000);
    })

    //人名也都確認後，將人名記到people_array裡
    $('#name_people').on('click', () => {
            people_array = []
            $('#main_row2').empty()
            $('#people>form>input').each(function(index) {

                people_array.push($(this).val())
            });
            //console.log(people_array);
            //console.log(typeof people_array[0]);
            $('#main').fadeIn(1000);;

        })
        //新增交易
    $('#add').on('click', () => {
        //滾動畫面
        var target = $('#main_row1');
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
        //產生交易方塊
        $div_ac = $('<div>').addClass('grass-div activity').hide()
        $select = $('<select>').attr('style', 'background-clip: padding-box;border: 1px solid #ced4da;border-radius: .25rem;')
        for (let i = 0; i < people_array.length; i++) {
            $option = $('<option>').text(people_array[i])
            $select.append($option)

        }

        $div_ac.append('付款人：' + '<select>' + $select.html() + '<select>' + '<br>' + '參與人：')

        $form = $('<form>')
            /*$input = $('<input>').attr('name', 'clickAll').addClass('clickAll').attr('type', 'checkbox')
            $form.append($input)
            $form.append(' 全選<br>')*/

        for (let i = 0; i < people_array.length; i++) {
            $input = $('<input>').attr('type', 'checkbox').attr('value', people_array[i]).attr('name', 'participant')
            $form.append($input)
            $form.append(' ' + people_array[i] + '<br>')

        }
        $input = $('<input>').attr('type', 'text').addClass('trade col-sm-6').attr('style', 'background-clip: padding-box;border: 1px solid #ced4da;border-radius: .25rem;')
        $form.append('交易原因：')
        $form.append($input)
        $input = $('<input>').attr('type', 'number').addClass('amount col-sm-6').attr('style', 'background-clip: padding-box;border: 1px solid #ced4da;border-radius: .25rem;')
        $form.append('<br>金額　　：')
        $form.append($input)

        $div_ac.append('<form>' + $form.html() + '<form>')
        $button = $('<button>').addClass("btn btn-outline-danger cancel mtbtn").attr('type', 'button').attr('style', 'margin:5px').text('取消交易')
        $div_ac.append($button)
        $('#main_row2').prepend($div_ac)
        $('#main_row2>.activity').show(1000)
    })


    /* $('#main_row2').on('click', '.clickAll', () => {

         if ($("#main_row2 .clickAll").prop("checked")) {
             $(event.target).siblings("input[name='participant']").each(function() {

                 $(this).prop("checked", true);
             });
         } else {
             $(event.target).siblings("input[name='participant']").each(function() {
                 $(this).prop("checked", false);
             });

         };

     });

     $('#main_row2').on('click', 'input[name="participant"]', () => {
         //each 便利每一個元素，讓其執行該函式
         $(event.target).siblings("input[name='participant']").each(function() {
             if (!$(this).prop('checked')) {
                 $(event.target).siblings("input[name='clickAll']").prop('checked', false);
                 //有一個不滿足就 跳出該迴圈，避免執行下面
                 return false;
             } else {
                 $(event.target).siblings("input[name='clickAll']").prop('checked', true);
             }
         })
     })*/



    //確定分錢
    $('#split').on('click', () => {
        var total = {}

        for (let i = 0; i < people_array.length; i++) {

            total[people_array[i]] = 0
        }
        console.log(total)
        $('#main_row2>.activity').each(function(index) {
            $amount = +$(this).find('input.amount').val()
                //console.log($amount)
                //console.log($(this).find('select').val())
            total[$(this).find('select').val()] += $amount
                //console.log(total)

            let m = $(this).find("input[type='checkbox']:checked").length

            $(this).find("input[name='participant']:checked").each(function(index) {
                    total[$(this).val()] -= ($amount / m)
                })
                //console.log(total)



        });

        //顯示結果
        $p = $('<p>')
        for (let i = 0; i < people_array.length; i++) {
            if (total[people_array[i]] >= 0) {
                $p.append(people_array[i] + ' 可得 ' + total[people_array[i]] + '\n');
            } else {
                $p.append(people_array[i] + ' 需付 ' + Math.abs(total[people_array[i]]) + '\n');
            }
        }
        alert($p.html())
    })

    //取消交易
    $('#main_row2').on('click', '.cancel', () => {
        $(event.target).closest('.activity').hide(1000, function() {
            $(this).remove()
        })


    })

})