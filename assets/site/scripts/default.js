/* --- jQuery - Funcoes do sistema ---
	
	Versao: 0.1
	 Autor: Christian Guilherme Fritsch
	E-mail: guilherme@n49.com.br / guilherme@opiniaoearte.com.br
	
	   Data de criacao: 11/01/2012
	Ultima atualizacao: 16/01/2012
	
*/

/* Variaveis globais */ 

var m_left = true;
var m_right = true;
var m_up = true;
var m_down = true;
var m_rotate = true;
var formas = new Array(1,2,11,12);
var prev_f = new Array(0,1,4,5)
var space = new Array()
var rotate2 = Math.floor(Math.random()*10)%4;
var forma2 = Math.floor(Math.random()*10)%7;
var rotate = rotate2;
var forma = forma2;
var p_left = 0;
var p_top = 0;
var dropping = false;
var pontos = 0;
var status = 'stopped'

var cR = 0 //coluna da direita
var cL = 0 //coluna da esquerda
var lS = 0 //linha superior
var lI = 0 //linha inferior

var bug = false;
var run = '';
var level = 600;
var level2 = 1;
var side = '';
var decremento = 50;

/*********************/


$(document).ready(function(){
  
//    /enable_buttons();
    var box = $('#content .box ul');
    side = $('#content .side');
    draw(forma2,rotate2,side.find('.next ul'));
    
    $('.point').jPlayer();
    game(box);
    
    
    
});

function enable_buttons(){
  
  if(navigator.appVersion.indexOf('Android') != -1 || navigator.appVersion.indexOf('iPhone') != -1){
    $('.limbo .controles').show();
  }else{
    $('.limbo .controles').hide();
  }
  
}

function controles(box){
  $(window).unbind('keydown');
  $(window).bind('keydown',function(e){
    switch(e.keyCode){
      case 37:{
          left(box);
          break;
      }
      case 38:{
          rotation(box);
          break;
      }
      case 39:{
          right(box);
          break;
      }
      case 40:{
          down(box);
          break;
      }
    }
  })
  $('.controles a').unbind('click');
  $('.controles a').bind('click',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var comando = $(this).attr('class');
    
    switch(comando){
      case 'esquerda':
      {
          left(box);
          break;
      }
      case 'girar':{
          rotation(box);
          break;
      }
      case 'direita':{
          right(box);
          break;
      }
      case 'descer':{
          down(box);
          break;
      }
    }
    
   return false;
   
  })
  
}


function getLimites(box,retorno){
  
  if(retorno){
    
    var f_t = box.find('.on').first().index();
    var lS_ = (parseInt(f_t/10))*10;

    var l_t = box.find('.on').last().index();
    var lI_ = parseInt(l_t/10);

    var cR_ = 0;
    box.find('.on').each(function(){
      if(parseInt($(this).index()%10)>cR_){
        cR_=parseInt($(this).index()%10);
      }
    });
    var cL_ = 10;
    box.find('.on').each(function(){
      if(parseInt($(this).index()%10)<cL_){
        cL_=parseInt($(this).index()%10);
      }
    });
    
    var r = new Array(lS_,lI_,cR_,cL_);
    return r;
    
  }else{

    var f_t = box.find('.on').first().index();
    lS = (parseInt(f_t/10))*10;

    var l_t = box.find('.on').last().index();
    lI = parseInt(l_t/10);

    cR = 0;
    box.find('.on').each(function(){
      if(parseInt($(this).index()%10)>cR){
        cR=parseInt($(this).index()%10);
      }
    });
    cL = 10;
    box.find('.on').each(function(){
      if(parseInt($(this).index()%10)<cL){
        cL=parseInt($(this).index()%10);
      }
    });
  }
  
}

function testMoves(box){

  m_left = true;
  m_right = true;
  m_up = true;
  m_down = true;
  
  var limites = getLimites(box,true);
  
  box.find('.on').each(function(){
    
    var i = $(this).index();
    if(box.find('li').eq(i+1).hasClass('set')){
      m_right = false;
    }
    if(box.find('li').eq(i-1).hasClass('set')){
      m_left = false;
    }
    if(box.find('li').eq(i+10).hasClass('set')){
      m_down = false;
    }
    if(limites[1]>=19){
      m_down = false
    }
    
  });
  
}

function testRotate(box){
  
  var formato = new Array();
  
  m_rotate = true;
  
  var limites = getLimites(box,true);
  $.each(space,function(i,s){
    if(box.find('li').eq(p_left+(p_top*10)+s).hasClass('set')){
      m_rotate = false;
    }
  })
}

function create(f,r,box){
  p_top = 0;
  box.find('.on').removeClass('on');
  $.each(forms(f,r,box),function(i,f){
    box.find('li').eq(f).addClass('on')
  });
  testOver(box);
}

function draw(f,r,box){
  box.find('.on').removeClass('on');
  forms(f,r,box);
  
  $.each(prev_f,function(i,f2){
    
    box.find('li').eq(f2).addClass('on')
  });
}

function down(box){
  var i = 0;
  getLimites(box);
  testMoves(box)
  if(m_down){
    p_top++;
    box.find('.on').not('.a').each(function(){
      i = $(this).index();
      box.find('li').eq(i+10).addClass('on').addClass('a');
    })
    box.find('.on').not('.a').removeClass('on');
    box.find('.a').removeClass('a');
  }else{
    dropping = false;
    box.find('.on').addClass('set').removeClass('on');
  }
}

function left(box){
  getLimites(box);
  testMoves(box)
  if(cL>0 && m_left){
    p_left--;
    var i = 0;
    box.find('.on').not('.a').each(function(){
      i = $(this).index();
      box.find('li').eq(i-1).addClass('on').addClass('a');
    })
    box.find('.on').not('.a').removeClass('on');
    box.find('.a').removeClass('a');
    box.find('.n').removeClass('n');
  }
}

function right(box){
  getLimites(box);
  testMoves(box)
  if(cR<9 && m_right){
    p_left++;
    var i = 0;
    box.find('.on').not('.a').each(function(){
      i = $(this).index();
      box.find('li').eq(i+1).addClass('on').addClass('a');
    })
    box.find('.on').not('.a').removeClass('on');
    box.find('.a').removeClass('a');
    box.find('.n').removeClass('n');
  }
}

function rotation(box){
  
  testRotate(box)
  
  if(m_rotate){
    rotate++ > 2 ? rotate = 0 : '';
  
    getLimites(box)
    create(forma,rotate,box);

    var i = 0;
    box.find('.on').not('.a').each(function(){
      i = $(this).index();
      if(p_left<8){
        box.find('li').eq(i+lS+p_left).addClass('on').addClass('a');
      }
      else{
        box.find('li').eq(i+lS+7).addClass('on').addClass('a');
      }    
    })

    var c = 0

    box.find('.a').each(function(){
      if(parseInt($(this).index()%10)>c){
        c=parseInt($(this).index()%10);
      }
    })
    box.find('.n').removeClass('n');
    if(p_left>=8 && c == 8){
      p_left=8;
      create(forma,rotate,box);
      box.find('.n').removeClass('n');
      box.find('.on').not('.a').not('.b').each(function(){
        i = $(this).index();
        box.find('li').eq(i+lS+p_left).addClass('on').addClass('b');
      })
        box.find('.a').removeClass('a');
        box.find('.on').not('.b').removeClass('on');
        box.find('.b').removeClass('b')
    }else{
      box.find('.on').not('.a').removeClass('on');
      box.find('.a').removeClass('a');
    }
  }
}

function line_form(box){
  
  var l = 19;
  var c = 9;
  var setted = true;
  var l2 = 19;
  var c2 = 9;
  
  while(l>-1){
    while(c>-1){
      
      if(!box.find('li').eq(c+(l*10)).hasClass('set')){
        setted = false;
      }
      c--;
    }
    
    if(setted){
      c2 = 9;
      l2 = l;
      while (c2>-1){
        box.find('li').eq(c2+(l2*10)).removeClass('set');
        c2--;
      }
      l2--;
      c2=9;
      while(l2>-1){
        while(c2>-1){
          if(box.find('li').eq(c2+(l2*10)).hasClass('set')){
             box.find('li').eq(c2+((l2+1)*10)).addClass('set')
             
          }
          c2--;
        }
        c2=9
        while (c2>-1){
          box.find('li').eq(c2+(l2*10)).removeClass('set');
          c2--;
        }
        c2=9;
        l2--;
      }
    }
    if(setted){
      pontos++
      $('.point').trigger('play');
      side.find('.info.pontos p').text(pontos*100);
      if((pontos*100)%1000 == 0 && pontos != 0){
        levelUp(box);
      }
      l++;
    }
    setted = true;
    c=9;
    l--;
  }
}

function start(box){
 
  controles(box);
 
  if(status == 'stopped'){
    $('.points').trigger('play');
    $('.music').trigger('play');
  }
  
  if(status == "gameover"){
     box.find('.off')
    .removeClass('on')
    .removeClass('set')
    .removeClass('off');

    pontos = 0;
    level = 500;
    side.find('.pontos p').text('0');
  }

  status = 'playing'
  
  draw(forma2,rotate2,side.find('.next ul'));
  
  run = setInterval(function(){
    
    if(dropping){
      down(box);
    }else{
      p_left = 0;
      line_form(box);
      dropping = true;
      forma = forma2;
      rotate = rotate2;
      create(forma,rotate,box);
      forma2 = Math.floor(Math.random()*10)%7
      rotate2 = Math.floor(Math.random()*10)%4
      draw(forma2,rotate2,side.find('.next ul'));
    }

  },level);
  
}

function pause(box){
  status = 'paused';
  $('audio').trigger('pause');
  run = clearInterval(run);
}

function continuar(box){
  start(box);
  $('.music').trigger('play');
}

function gameover(box){
  status = 'gameover';
  $('.music').trigger('pause');
  box.find('.set').addClass('off');
  run = clearInterval(run);
  $('.pause').unbind('click').addClass('start').text('Recomeçar?').removeClass('pause');
  game(box);
}

function game(box){
  
  
  $('.start').click(function(e){
    e.stopImmediatePropagation()
    $('.start').unbind('click').addClass('pause').text('Pausar').removeClass('start')
    start(box);
    game(box)
  });
  
  $('.pause').click(function(e){
    e.stopImmediatePropagation()
    $('.pause').unbind('click').addClass('paused').text('Continuar?').removeClass('pause');
    pause(box);
    game(box);
  })
  
  $('.paused').click(function(e){
    e.stopImmediatePropagation()
    $('.paused').unbind('click').addClass('pause').text('Pausar').removeClass('start')
    continuar(box);
    game(box)
  });
  
}

function testOver(box){
  if(box.find('li.set').hasClass('on')){
    gameover(box)
  };
}

function levelUp(box){
  if(level>50){
    level -= decremento;
    level2++;
    side.find('.info.nivel p').text(level2);
    levelUpBy10(box,level2);
  }
  run = clearInterval(run);
  start(box);
  game(box);
  $('.music').trigger('play');
}

function levelUpBy10(box,level2){
  
  if(level2%12 == 0){
    level = 600;
    box.parent('.box').css({
      '-webkit-transform':'rotate(45deg)',
      '-moz-transform':'rotate(45deg)'
    });
  }
  
  if(level2 > 48){
    decremento = 80;
    level = 800;
    box.parent('.box').css({
      '-webkit-transform':'rotate(0deg)',
      '-moz-transform':'rotate(0deg)'
    });
    box.parent('.box').addClass('crazy');
  }
  
}

/* Formas */

function forms(f,r,box){
  switch(f){
    case 0: /* O */
      {
        space = new Array (0,1,10,11)
        switch(r){
          case 0:{
              formas = new Array(0,1,10,11);
              prev_f = new Array(0,1,4,5)
              return formas;
              break;
          }
          case 1:{
              formas = new Array(0,1,10,11);
              prev_f = new Array(0,1,4,5)
              return formas;
              break;
          }
          case 2:{
              formas = new Array(0,1,10,11);
              prev_f = new Array(0,1,4,5)
              return formas;
              break;
          }
          case 3:{
              formas = new Array(0,1,10,11);
              prev_f = new Array(0,1,4,5)
              return formas;
              break;
          }
        }
        break;
      }
   case 1: /* L para direita */
      {
        space = new Array (0,1,2,10,11,12,20,21,22)
        switch(r){
          case 0:{
              formas = new Array(0,1,2,10);
              prev_f = new Array(0,1,2,4)
              return formas;
              break;
          }
          case 1:{
              formas = new Array(0,1,11,21);
              prev_f = new Array(0,1,5,9)
              return formas;
              break;
          }
          case 2:{
              formas = new Array(2,10,11,12);
              prev_f = new Array(2,4,5,6)
              return formas;
              break;
          }
          case 3:{
              formas = new Array(0,10,20,21);
              prev_f = new Array(0,4,8,9)
              return formas;
              break;
          }
        }
        break;
      }
    case 2: /* L para esquerda */
      {
        space = new Array (0,1,2,10,11,12,20,21,22)
        switch(r){
          case 0:{
              formas = new Array(0,1,2,12);
              prev_f = new Array(0,1,2,6)
              return formas;
              break;
          }
          case 1:{
              formas = new Array(1,11,20,21);
              prev_f = new Array(1,5,8,9)
              return formas;
              break;
          }
          case 2:{
              formas = new Array(0,10,11,12);
              prev_f = new Array(0,4,5,6)
              return formas;
              break;
          }
          case 3:{
              formas = new Array(0,1,10,20);
              prev_f = new Array(0,1,4,8)
              return formas;
              break;
          }
        }
        break;
      }
    case 3: /* S para direita*/
      {
        space = new Array (0,1,2,10,11,12,20,21,22)
        switch(r){
          case 0:{
              formas = new Array(1,2,10,11);
              prev_f = new Array(1,2,4,5)
              return formas;
              break;
          }
          case 1:{
              formas = new Array(0,10,11,21);
              prev_f = new Array(0,4,5,9)
              return formas;
              break;
          }
          case 2:{
              formas = new Array(1,2,10,11);
              prev_f = new Array(1,2,4,5)
              return formas;
              break;
          }
          case 3:{
              formas = new Array(0,10,11,21);
              prev_f = new Array(0,4,5,9)
              return formas;
              break;
          }
        }
        break;
      }
    case 4: /* S para esquerda*/
      {
        space = new Array (0,1,10,11,12,20,21,22)
        switch(r){
          case 0:{
              formas = new Array(0,1,11,12);
              prev_f = new Array(0,1,5,6)
              return formas;
              break;
          }
          case 1:{
              formas = new Array(1,10,11,20);
              prev_f = new Array(1,4,5,8)
              return formas;
              break;
          }
          case 2:{
              formas = new Array(0,1,11,12);
              prev_f = new Array(0,1,5,6)
              return formas;
              break;
          }
          case 3:{
              formas = new Array(1,10,11,20);
              prev_f = new Array(1,4,5,8)
              return formas;
              break;
          }
        }
        break;
      }
    case 5: /* i */
      {
        space = new Array(0,1,2,3,10,11,12,13,20,21,22,23,30,31,32,33);
        switch(r){
          case 0:{
              formas = new Array(0,10,20,30);
              prev_f = new Array(1,5,9,13)
              return formas;
              break;
          }
          case 1:{
              formas = new Array(0,1,2,3);
              prev_f = new Array(4,5,6,7)
              return formas;
              break;
          }
          case 2:{
              formas = new Array(0,10,20,30);
              prev_f = new Array(1,5,9,13)
              return formas;
              break;
          }
          case 3:{
              formas = new Array(0,1,2,3);
              prev_f = new Array(4,5,6,7)
              return formas;
              break;
          }
        }
        break;
      }
    case 6: /* T */
      {
        space = new Array (0,1,2,10,11,12,20,21,22)
        switch(r){
          case 0:{
              formas = new Array(0,1,2,11);
              prev_f = new Array(0,1,2,5)
              return formas;
              break;
          }
          case 1:{
              formas = new Array(1,11,21,10);
              prev_f = new Array(1,4,5,9)
              return formas;
              break;
          }
          case 2:{
              formas = new Array(10,11,1,12);
              prev_f = new Array(1,4,5,6)
              return formas;
              break;
          }
          case 3:{
              formas = new Array(0,10,11,20);
              prev_f = new Array(0,4,5,8)
              return formas;
              break;
          }
        }
        break;
      }
    default: /* O */
      {
        space = new Array (0,1,10,11)
        switch(r){
          case 0:{
              formas = new Array(0,1,10,11);
              prev_f = new Array(0,1,4,5)
              return formas;
              break;
          }
          case 1:{
              formas = new Array(0,1,10,11);
              prev_f = new Array(0,1,4,5)
              return formas;
              break;
          }
          case 2:{
              formas = new Array(0,1,10,11);
              prev_f = new Array(0,1,4,5)
              return formas;
              break;
          }
          case 3:{
              formas = new Array(0,1,10,11);
              prev_f = new Array(0,1,4,5)
              return formas;
              break;
          }
        }
        break;
      }
  }
}






