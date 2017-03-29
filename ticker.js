/* Usage:
<div style="width:970px;height:20px;position:relative;">
<script type="text/javascript">
var blog_url = "http://livedablog.blogspot.com";
var latest_post = 10;
var scrolling_speed = "8";
var close_button = false;
var info_text = true;
</script>
<script src="https://googledrive.com/host/0B18YRYq_f_eCWFZGQXNRdHRmNWM/ticker.js"></script>
</div>
<br />
<br />
<div style='clear:both;'/>

 * 
 *	   var blog_url - Add your blog URL by replacing http://livedablog.blogspot.com
 *	   var latest_post - The number of posts link you want to have in the ticker
 * 	   var scrolling_speed - Increase/Decrease the number to increase/decrease scrolling speed.
 * 	   var close_button - If you want to add close button in the ticker
 * 	   var info_text - If you want to remove/keep the text "Latest Articles" and RSS icon.
 */
var entries; var feed;
var feed_url = blog_url.match(/\/$/) ? blog_url : blog_url+"/";
feed_url += "feeds/posts/default";
function recent_post_createEntries(){
    var entries = feed.entry;
    var entriesArr = [];
    for(var i=0; i<latest_post; i++){
        var entry = entries[i];
        var entryObj = new Object();
        entryObj.title = entry.title.$t;
        entryObj.href  = getHref(entry.link);
        entriesArr.push(entryObj);
    }
    return entriesArr;
}
function getBlogTitle(){
    return feed.title.$t;
}
function  getBlogURL(){
    return getHref(feed.link);
}
function getHref(links){
    for(var i=0; i<links.length; i++){
        var link = links[i];
        if(link.rel == "alternate"){return link.href;}
    }
    return null;
}
function recent_post_start(json){
    feed = json.feed;
    entries = recent_post_createEntries();
    recent_post_style();
    recent_post_content();
}
function recent_post_text(){
    var src = feed_url+"?alt=json-in-script&callback=recent_post_start&max-results="+latest_post;
    var s = "<script src='"+src+"'></script>";
    document.write(s);
}
function recent_post_style(){
    var s = "<style type='text/css'>";
    s += "#recent_post{";
	s += "position:absolute;";
    s += "margin:0px;";
    s += "padding: 5px 2px 2px;";
    s += "width:auto;";
    s += "border:1px solid #E66C2C";
    s += "}";
    s += "</style>";
    document.write(s);
}
function recent_post_content(){
    var s = "<div id='recent_post' title='Most recent posts!'>";
    if(info_text){
	s += "<div style='float:left'>";
    s += " <a href='"+feed_url+"'>";
    s += " <img src='http://lh6.ggpht.com/__TByDg0HQqc/S6cjD0Sz1OI/AAAAAAAAAd4/O4s-OkSpdF8/menujublog_rss.gif'";
    s += " height='20'/>";
    s += " </a>";
    s += "</div>";
    s += "<div style='float:left; text-align:right; margin-left:10px;'>";
    s += "<b>Latest Posts :</b>";
    s += "</div>";
    }
    s += "  <marquee style='float:left; margin-left:10px; width:82%' scrollAmount='"+scrolling_speed+"'>";
    for(var i=0; i<latest_post; i++){
        var recent_post_entries = entries[i];
        s += "<a href='"+recent_post_entries.href+"' ";
        s += "onmouseover='this.parentNode.stop()' onmouseout='this.parentNode.start()'";
        s += ">" + recent_post_entries.title + "</a>";
        if(i != latest_post-1){s += " | ";}
    }
    s += "</marquee>";
    if(close_button){
	s += "<div style='float:right; margin-right:10px;'>";
    s += "<a href='javascript:void(0)' onclick='document.getElementById(\"recent_post\").style.display=\"none\"'>";
    s += "(X)";
    s += "</a>";
    s += "</div>";
    }
    document.write(s);
}
recent_post_text();
