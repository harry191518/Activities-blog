var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var exec = require("child_process").exec;

function start(response, request) {
    console.log("Request handler 'start' was called.");

    var body = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Super Activity</title><style type="text/css"> .indent-small {margin-left: 5px;} .form-group.internal {margin-bottom: 0;} .dialog-panel {margin: 30px;} .datepicker-dropdown {z-index: 200 !important;} .panel-body {background: #e5e5e5;background: -moz-radial-gradient(center, ellipse cover, #e5e5e5 0%, #ffffff 100%);background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, #e5e5e5), color-stop(100%, #ffffff));background: -webkit-radial-gradient(center, ellipse cover, #e5e5e5 0%, #ffffff 100%);background: -o-radial-gradient(center, ellipse cover, #e5e5e5 0%, #ffffff 100%);background: -ms-radial-gradient(center, ellipse cover, #e5e5e5 0%, #ffffff 100%);background: radial-gradient(ellipse at center, #e5e5e5 0%, #ffffff 100%);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e5e5e5", endColorstr="#ffffff", GradientType=1);font: 600 15px "Open Sans", Arial, sans-serif;}label.control-label {font-weight: 600;color: #777;}</style></head><body><!DOCTYPE html><head>'+
               "<link href='http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css' rel='stylesheet' type='text/css'><link href='//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.2.0/css/datepicker.min.css' rel='stylesheet' type='text/css'><link href='//cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/1.8/css/bootstrap-switch.css' rel='stylesheet' type='text/css'><link href='http://davidstutz.github.io/bootstrap-multiselect/css/bootstrap-multiselect.css' rel='stylesheet' type='text/css'><script src='//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js' type='text/javascript'></script><script src='//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0/js/bootstrap.min.js' type='text/javascript'></script><script src='//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.2.0/js/bootstrap-datepicker.min.js' type='text/javascript'></script><script src='//cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/1.8/js/bootstrap-switch.min.js' type='text/javascript'></script><script src='http://davidstutz.github.io/bootstrap-multiselect/js/bootstrap-multiselect.js' type='text/javascript'></script></head><body><div class='container'><div class='panel panel-primary dialog-panel'><div class='panel-heading' align='center'><h1>上傳文宣</h1></div><div class='panel-body'><form class='form-horizontal' action='/upload' enctype='multipart/form-data' method='post'><div class='form-group'><label class='control-label col-md-2 col-md-offset-2' for='id_accomodation'>組別</label><div class='col-md-6'><div class='col-md-2'><div class='form-group internal'><select class='form-control' name='group'><option>傳情</option><option>舞會</option><option>野餐</option><option>演唱會</option><option>餞別宴</option><option>老榕盃</option></select></div></div></div></div><div class='form-group'><label class='control-label col-md-2 col-md-offset-2' for='id_email'>編號</label><div class='col-md-4'><div class='form-group'><div class='col-md-7'><input class='form-control' name='number' size='20' placeholder='a01   ＊傳情第一天＊' type='text' ></div></div></div></div><div class='form-group'><label class='control-label col-md-2 col-md-offset-2' for='id_email'>標題</label><div class='col-md-4'><div class='form-group'><div class='col-md-7'><input class='form-control' name='title' size='20' placeholder='送你一份愛的禮物 ＃01' type='text' ></div></div></div></div><div class='form-group'><label class='control-label col-md-2 col-md-offset-2' for='id_email'>圖片</label><div class='col-md-4'><div class='form-group'><div class='col-md-8'><input class='form-control' name='picture' multiple='multiple' type='file' ></div></div></div></div><div class='form-group'><label class='control-label col-md-2 col-md-offset-2' for='id_comments'>宣傳內容</label><div class='col-md-6'><div class='form-group'><div class='col-md-9'><textarea class='form-control' name='comments' placeholder='' rows='8'></textarea></div> </div></div></div><div class='form-group'><div class='col-md-offset-4 col-md-3'><button class='btn-lg btn-primary' type='submit'>Submit</button></div><div class='col-md-3'><button class='btn-lg btn-danger' type='reset'>Reset</button></div></div></form></div></div></div></body>"+
               '</body></html>'
               

    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    var post = {}, file = {};
    form.uploadDir = '/Users/RLai/Node/first/picture';

    form
        .on('error', function(err){ 
            console.log(err); 
        })
        .on('field', function(field, value){ 
            if (form.type == 'multipart'){
                if (field in post){
                    if (util.isArray(post[field]) === false) {
                        post[field] = [post[field]];
                    }
                    post[field].push(value);
                    return;
                }    
            }
            post[field] = value;
            exec("echo " + "'" + value + "' >> new.md");
        })
        .on('file', function(field, file){
            file[field] = file;
            fs.renameSync(file.path, '/Users/RLai/Node/test/public/picture/' + file.name);
            exec("echo '%---%' >> new.md");
            exec("echo " + "'" + file.name + "' >> new.md");
        })
        .on('end', function(){ 
            exec("/Users/RLai/Node/first/mdMaker");
            for (var i = 0; i < 100000; i++) { i++; }
            exec("rm /Users/RLai/Node/first/new.md");
        });
    form.parse(request);

    response.writeHead(200, {"Content-Type": "text/html", "font-family": "微軟正黑體"});
    response.write("<a href='http://localhost:4000/'>讚讚讚繼續加油!點我回去><</a>")
    response.end();
}

exports.start = start;
exports.upload = upload;
