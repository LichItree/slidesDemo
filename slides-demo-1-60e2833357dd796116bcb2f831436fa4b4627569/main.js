let $buttons=$('#buttonWrapper>button')
let $slides=$('#slides')
let $images=$slides.children('img')
let current=0


makeFakeSlides()
$slides.css({transform:'translateX(-400px)'})
bindEvents()
$(next).on('click',function(){goToSlide(current+1)})
$(previous).on('click',function(){goToSlide(current-1)})

let timer=setInterval(function(){
  goToSlide(current+1)
},2000)

$(container).on('mouseenter',function(){
  window.clearInterval(timer)
}).on('mouseleave',function(){
  timer=setInterval(function(){
    goToSlide(current+1)
  },2000)
})


function bindEvents(){
  $('#buttonWrapper>button').on('click',function(e){// $('#buttonWrapper').on('click','button',function(e){
    let $button =$(e.currentTarget)
    let index=$button.index()
    console.log(index)
    goToSlide(index)
  })
}
function goToSlide(index){
  if(index>$buttons.length-1){
    index=0
  }else if(index<0){
    index=$buttons.length-1
  }
  if(current===$buttons.length-1 && index === 0 ){
    $slides.css({transform:`translateX(${-($buttons.length+1)*400}px)`})//假的1，功能是为了做出了动画的效果
           .one('transitionend',function(){
              $slides.hide().offset()//offset返回对象，所以不继续链下去，hide在show没有反应就是合并了，之间加个offset就可以
              $slides.css({transform:`translateX(${-(index+1) * 400}px)`}).show()
            })
  }else if(index === $buttons.length-1 && current === 0 ){
    console.log('f t l')
    $slides.css({transform:'translateX(0px)'})//假
        .one('transitionend',function(){
           $slides.hide().offset()
           $slides.css({transform:`translateX(${-(index+1) * 400}px)`}).show()
          })
  }else{
    $slides.css({transform:`translateX(${- (index+1) * 400}px)`})//字符串模板，注意这里的符号是`而不是单引号！！！！
  }
  current=index
}


// function bindEvents(){
//   $buttons.eq(0).on('click',function(){
//     if(current==2){
//       console.log('说明是从最后一张到第一张')
//       $slides.css({transform:'translateX(-1600px)'})//假的1，功能是为了做出了动画的效果
//        .one('transitionend',function(){
//           $slides.hide().offset()//offset返回对象，所以不继续链下去，hide在show没有反应就是合并了，之间加个offset就可以
//           $slides.css({transform:'translateX(-400px)'}).show()
//       })
//     }else{
//       $slides.css({transform:'translateX(-400px)'})
//     }
//     current=0
//   })
//   $buttons.eq(1).on('click',function(){
//     $slides.css({transform:'translateX(-800px)'})
//     current=1
//   })
  
//   $buttons.eq(2).on('click',function(){
//     if(current==0){
//         console.log('说明是从最后一张到第一张')
//         $slides.css({transform:'translateX(0px)'})//假
//          .one('transitionend',function(){
//             $slides.hide().offset()
//             $slides.css({transform:'translateX(-1200px)'}).show()
//       })    
//     }else{
//       $slides.css({transform:'translateX(-1200px)'})
//     }
//     current=2
//   })
// }

function makeFakeSlides(){
  let $firstCopy=$images.eq(0).clone(true)//参数是ture表示连带里面内容一起克隆
  let $lastCopy=$images.eq($images.length-1).clone(true)
  //console.log($firstCopy[0].outerHTML),得到我们复制的内容，是我们想要的
  $slides.append($firstCopy)//第一张的复制品放到最后一张的后面
  $slides.prepend($lastCopy)//最后一张的复制品放到第一张的前面,加完之后要调整位置
}