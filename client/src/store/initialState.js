const data=()=>
{
    let userPanelDate;
    if(localStorage['login'] && localStorage['password']){
        userPanelDate={
            userPanelType:'LOGGED_IN',
            login:localStorage['login'],
            password:localStorage['password'],
            hint:false
        };
    }
    else{
        userPanelDate={
            userPanelType:'AUTHORIZATION',
            hint:false,
            login:'',
            password:''
        };
    }

    return {
        addPostPanel:false,
        posts:[
        {
             header:'Совет дня, ёбанныврот',
             category:'совет',
             text:'Для современного мира существующая теория представляет собой интересный эксперимент проверки системы обучения кадров, соответствующей насущным потребностям. Как уже неоднократно упомянуто, представители современных социальных резервов могут быть представлены в исключительно положительном свете. Каждый из нас понимает очевидную вещь: социально-экономическое развитие требует определения и уточнения дальнейших направлений развития.',
             likes:123,
             liked:false,
             saves:34,
             saved:false,
             show_comments:false,
             comments:[],
             author:'sereja',
             date:'08-05-19',
             IDP:12
         }
        ],
        sort:'SORT_BY_DATE',
        userPanelDate
    }
};

export default data;