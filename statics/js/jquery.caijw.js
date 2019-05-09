$.sendAjax = function(url,data,success){
    var type = arguments[3] ? arguments[3] : "json";
    $.ajax({
        url: url,
        data: data,
        dataType: type,
        type: 'POST',
        headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
        success: success,
        error: function(xhr, type,dsd){
            console.log(dsd);
        }
    });
}
$.fn.QiniuUpLoad=function(container,funs){
    funs.exist=function(name,data){if(eval("this."+name)==undefined){return "";}eval("this."+name)(data);};
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: this.attr("id"),
        uptoken_url: '/service/getToken',            //根据需要赋予新值
        domain: 'http://7xsqzc.com1.z0.glb.clouddn.com/',   //根据需要赋予新值
        get_new_uptoken: false,
        container: container,
        max_file_size: '100mb',
        flash_swf_url: 'js/plupload/Moxie.swf',
        max_retries: 3,
        dragdrop: true,
        drop_element: container,
        chunk_size: '4mb',
        auto_start: true,
        init: {
            'FilesAdded': function(up, files){
                plupload.each(files, function(file){
                    // 文件添加进队列后,处理相关的事情
                    funs.exist('FilesAdded',{'up':up,'files':files});
                });
            },
            'BeforeUpload': function(up, file){
                // 每个文件上传前,处理相关的事情
                funs.exist('BeforeUpload',{'up':up,'file':file});
            },
            'UploadProgress': function(up, file){
                // 每个文件上传时,处理相关的事情
                funs.exist('UploadProgress',{'up':up,'file':file});
            },
            'FileUploaded': function(up, file, info){
                // 每个文件上传成功后,处理相关的事情
                // 其中 info 是文件上传成功后，服务端返回的json，形式如
                // {
                //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                //    "key": "gogopher.jpg"
                //  }
                // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                var domain = up.getOption('domain');
                var res = jQuery.parseJSON(info);
                var sourceLink = domain + res.key; //获取上传成功后的文件的Url
                funs.exist('FileUploaded',{'up':up,'file':file,'info':info,'url':sourceLink,'key':res.key});


            },
            'Error': function(up, err, errTip){
                //上传出错时,处理相关的事情
                console.log(err);
                funs.exist('Error',{'up':up,'err':err,'errTip':errTip});
            },
            'UploadComplete': function(){
                //队列文件处理完毕后,处理相关的事情
                funs.exist('UploadComplete',{});
            },
            'Key': function(up, file) {
                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                // 该配置必须要在 unique_names: false , save_key: false 时才生效
                var prefix = "slh_";
                var myDate = new Date();
                var y = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
                var m = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
                if (m < 10) m = '0' + m;
                var d = myDate.getDate();
                if (d < 10) d = '0' + d;
                var h = myDate.getHours();       //获取当前小时数(0-23)
                if (h < 10) h = '0' + h;
                var i = myDate.getMinutes();     //获取当前分钟数(0-59)
                if (i < 10) i = '0' + i;
                var s = myDate.getSeconds();
                if (s < 10) s = '0' + s;
                var time = '' + y + m + d + h + i + s;
                var randstr = Math.random().toString(36).substr(2);
                var ext = '.' + file.name.substr(file.name.indexOf('.') + 1).toLowerCase();
                var key = prefix + time + randstr + ext;
                return key;
            }
        }
    });
}