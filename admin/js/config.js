//沙箱模式
(function () {
    //外接js文件一般写在head中，此时DOM树还没有加载，所以需要将代码写到入口函数中
    $(function () {
        jeDate('#testico', {
            trigger: 'click',
            theme: { bgcolor: "#00A680", pnColor: "#00DDAA" },//绿色主题
            format: "YYYY-MM-DD",
            isinitVal: true,
        });

        /* 初始化选项 */
        tinymce.init({
            selector: '#mytextarea',
            height:'350px',
            language: 'zh_CN',
            directionality: 'ltl',
            browser_spellcheck: true,
            contextmenu: false,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste imagetools wordcount",
                "code"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
        });
    });

})();