/* --- jQuery - Funcoes do sistema ---
	
	Versao: 0.1
	 Autor: Christian Guilherme Fritsch
	E-mail: guilherme@n49.com.br / guilherme@opiniaoearte.com.br
	
	   Data de criacao: 11/01/2012
	Ultima atualizacao: 16/01/2012
	
*/


/* Funcoes de validacao*/

function validaEmail(campo){
  var email	= jQuery(campo).val();
  var regra=/^.{2,}@.{2,}\..{2,}$/;
  var invalido= /[\(\)\<\>\,\;\:\\\/\"\[\]\ ]/

  if(!(regra.test(email))||email.match(invalido)){
    return false;
  }else{
    return true;
  }
}

function validaHora(campo){
  var valor = jQuery(campo).val();
  var regra = /^[0-9]{1,4}\:[0-5][0-9]$/;
		
  if(valor.match(regra)){
    return true;
  }else{
    return false;
  }
}

function validaFone(campo){
  var valor = jQuery(campo).val();
  var regra = /^[0-9]{2}\ \([0-9]{2}\)\ [0-9]{4}\-[0-9]{4}$/;
		
  if(valor.match(regra)){
    return true;
  }else{
    return false;
  }
}

function validaData(campo){
  var valor = jQuery(campo).val();
  var regra = /^([0-9]|[0,1,2][0-9]|3[0,1])\/(0[1-9]|1[0,1,2])\/\d{4}$/;
		
  if(valor.match(regra)){
    return true;
  }else{
    return false;
  }
}

function validacao(formulario){
  
  jQuery(formulario).submit(function(){
    
    var sucesso = true;
    
    jQuery(this).find('input[type="text"],select,textarea').each(function(){
     
      if(jQuery(this).val() == '' && jQuery(this).hasClass('requer')){
        sucesso = false;
        jQuery(this).addClass('failed');
      }else if(jQuery(this).hasClass('mdagua') && jQuery(this).val() == jQuery(this).attr('lang')){
        sucesso = false;
        jQuery(this).addClass('failed');
      }else if(jQuery(this).hasClass('campo-mail')){
        if(!validaEmail(jQuery(this))){
          sucesso = false;
          jQuery(this).addClass('failed');
        }else{
          jQuery(this).removeClass('failed');
        }
      }else{
        jQuery(this).removeClass('failed');
      }
    });
    
    
    
    if(sucesso == true){
      jQuery(this).find('.erro').each(function(){
        jQuery(this).removeClass('erro');
      })
      
      return false;
    }else{
      
      jQuery(this).find('input.failed').each(function(){
        jQuery(this).removeClass('failed');
        jQuery(this).parents('.bg-input').addClass('erro');
      });
      
      jQuery(this).find('select.failed').each(function(){
        jQuery(this).removeClass('failed');
        jQuery(this).parents('.select-box').addClass('erro');
      });
      
      jQuery(this).find('textarea.failed').each(function(){
        jQuery(this).removeClass('failed');
        jQuery(this).parents('.bg-textarea').addClass('erro');
      });

      return false;
    }
  })
}
/* fim das fuçoes de validacao*/