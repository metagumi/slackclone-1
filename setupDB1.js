var sqlite3 = require('sqlite3').verbose();
var filename = 'scratch.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database('scratch.db');


if (!dbexists) {
    db.serialize(function() {
        var createUserTableSql = "CREATE TABLE IF NOT EXISTS USER " +
                       "(USERID         CHAR(25)    PRIMARY KEY     NOT NULL," +
                       " NAME           CHAR(50)                    NOT NULL, " + 
                       " PASSWORD       CHAR(50)                    NOT NULL)"; 

        var createTweetTableSql = "CREATE TABLE IF NOT EXISTS TWEET " +
                    "(USERID        CHAR(25)    NOT NULL," +
                    " TWEET         CHAR(140)   NOT NULL, " + 
                    " DATE          TEXT        NOT NULL)"; 

        var createFollowerTableSql = "CREATE TABLE IF NOT EXISTS FOLLOWER " +
                    "(USERID        CHAR(25)    NOT NULL," +
                    " FOLLOWERID    CHAR(140)   NOT NULL)"; 

        db.run(createUserTableSql);
        db.run(createTweetTableSql);
        db.run(createFollowerTableSql);

        var insertUserSql = "INSERT INTO USER (USERID, NAME, PASSWORD) " +
            "VALUES ('shuvo',   'Shuvo Ahmed',      'shuvopassword')," +
                   "('abu',     'Abu Moinuddin',    'abupassword')," +
                   "('charles', 'Charles Walsek',   'charlespassword')," +
                   "('beiying', 'Beiying Chen',     'beiyingpassword')," +
                   "('swarup',  'Swarup Khatri',    'swarup');"; 
        
        var insertFollowerSql = "INSERT INTO FOLLOWER (USERID, FOLLOWERID) " +
           "VALUES ('shuvo', 'abu')," +
                  "('abu', 'swarup')," +
                  "('abu', 'charles')," +
                  "('beiying', 'shuvo');";
                

        var insertTweetSql = "INSERT INTO TWEET (USERID, TWEET, DATE) " +
             "VALUES ('shuvo',      'Welcome to Tweeter Clone',                     '2016-08-05 12:45:00'), " +
                    "('abu',        'Tweet by Abu',                                 '2016-08-05 12:46:00'), " +
                    "('abu',        'Lets do Node.js',                              '2016-08-08 12:46:00'), " +
                    "('abu',        'Lunch Time!',                                  '2016-08-08 12:30:00'), " +
                    "('abu',        'We are in 2-nd week of boot camp training!',   '2016-08-08 08:30:00'), " +
                    "('shuvo',      'SQLite is easy configuration!',                '2016-08-05 09:30:00'), " +
                    "('shuvo',      'Rio Olympic!',                                 '2016-08-05 09:30:00'), " +
                    "('shuvo',      'Welcome to 2nd week of boot camp...',          '2016-08-08 08:30:00'), " +
                    "('charles',    'SQLite is cool!',                              '2016-08-05 11:30:00'), " +
                    "('charles',    'Not bad for a Mainframe developer...',         '2016-08-08 09:30:00'), " +
                    "('charles',    'Having fun with HTML / CSS!',                  '2016-08-05 11:30:00'), " +
                    "('charles',    'Github!',                                      '2016-08-05 11:30:00'), " +
                    "('beiying',    'Twitter - Cloned!',                            '2016-08-08 13:30:00'), " +
                    "('swarup',     'Tweet, tweet!',                                '2016-08-05 11:30:00'), " +
                    "('shuvo',      'First week of boot camp complete!',            '2016-08-05 16:47:00');"; 
      
        db.run(insertFollowerSql);
        db.run(insertUserSql);
        db.run(insertTweetSql);

        db.each("SELECT * FROM TWEET", function(err, row) {
            console.log(row.USERID + ": " + row.TWEET);
        });
    });
}
