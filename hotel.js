var fs = require('fs');
var customer = new Map();
var booking = new Map();
var room = new Map();

loadData = () => {
    // load all customer
    // customer_id name address phone
    fs.readFile('customer.txt', function (err, filedata) {
        if (err) throw err;

        let customer_data = filedata.toString();
        let customer_lines = customer_data.split('\n');

        customer_lines.forEach((line) => {
            let dat = line.split('-');
            if (customer.has(dat[1])) {
                let predata = customer.get(dat[1])
                predata.push({
                    customer_id: dat[0],
                    customer_address: dat[2],
                    customer_phone: dat[3]
                })
            } else {
                customer.set(dat[1], [
                    {
                        customer_id: dat[0],
                        customer_address: dat[2],
                        customer_phone: dat[3]
                    },
                ]);
            }
        })
    });

    // load all book
    //book_id customer_id room_id  date 

    fs.readFile('book.txt', function (err, filedata) {
        if (err) throw err;

        let booking_data = filedata.toString();
        let booking_lines = booking_data.split('\n');

        booking_lines.forEach((line) => {
            let dat = line.split(' ');
            if (booking.has(dat[1])) {
                let predata = booking.get(dat[1])
                predata.push({
                    booking_id: dat[0],
                    room_id: dat[2],
                    time: dat[3],
                    // total_price:dat[4]
                })
            } else {
                booking.set(dat[1], [
                    {
                        booking_id: dat[0],
                        room_id: dat[2],
                        time: dat[3],
                        // total_price:dat[4]
                    },
                ]);
            }
        })
        // console.log(tweets);
    });

    // load room list
    // room_id room_type price status

    fs.readFile('room.txt', function (err, filedata) {
        if (err) throw err;
        let room_data = filedata.toString();
        let room_lines = room_data.split('\n');

        room_lines.forEach((line) => {
            let dat = line.split('-');
            if (room.has(dat[0])) {
                let predata = booking.get(dat[0])
                predata.push({
                    room_type: dat[1],
                    price : dat[2],
                    status: dat[3],
                    
                })
            } else {
                room.set(dat[0], [
                    {
                        room_type: dat[1],
                        price : dat[2],
                        status: dat[3],
                    },
                ]);
            }
        })
        // console.log(follows);

    });

};




timeline = (user_id) => {
    // return ข้อความทั้งหมดที่ user_id นี้จะเห็น (ข้อความที่ tweet โดยเหล่าคนที่ user_id นี้ได้ follow อยู่)

    let tweet_user_follow = follows.get(user_id);
  //  console.log(tweet_user_follow);
    let data = [];
    tweet_user_follow.forEach((user) => {
        let getTweet = tweets.get(user)
        if (getTweet !== undefined) {
            getTweet.forEach((value) => {
                data.push({
                    userFollow: user,
                    tweets: {
                        message: value.tweet.message
                    }
                })
            })
        }
    })
    return data;
}

feed = (user_id) => {
    // return ข้อความทั้งหมดที่ user_id นี้เคย tweet หรือถ้าไม่ใส่ user_id จะ return tweet ทั้งหมด

    let data = [];
    if (user_id) {
        let getTweet = tweets.get(user_id);
        getTweet.forEach((user) => {
            data.push({
                tweets: {
                    message: user.tweet.message
                }
            })
        })
    } else {
        tweets.forEach((value) => {
            value.forEach((item) => {
                data.push(item.tweet)
            })
        })
        // console.log(tweets.get('1'));
    }

    return data;

}

create_tweet = (user_id, source_id, message) => {
    // save
    // return ตัว tweet นั้นกลับไป
    let result = saveCreate(user_id, source_id, message);
    return result;
}

follow = (user_id, follow_user_id) => {
    // save
    // return ว่าใคร follow ใคร (ที่ได้ทำเรียบร้อยแล้วใน action นี้)

    let result = saveFollow(user_id, follow_user_id);
    return result;
}

let saveFollow = (user_id, follow_user_id) => {
    let result;
    fs.readFile('follow.txt', (err, file_data) => {
        if (err) throw err;

        let follow_data = file_data.toString();
        let follow_lines = follow_data.split('\n');
        let data = [];

        follow_lines.forEach((line) => {
            let key = line.split(' ');
            data.push([key[0], key[1]]);
        });
        data.push([user_id, follow_user_id]);
        let str = '';
        data.forEach((val, index) => {
            if (data.length - 1 === index) {
                str += data[index].join(' ');
            } else {
                str += data[index].join(' ') + '\n'
            }
        })

        fs.writeFile('follow.txt', str, (err) => {
            if (err) throw err;
        });

    });

    result = {
        message: `User id ${user_id} follow User id ${follow_user_id}`
    }

    return result;
}

let saveCreate = (user_id, source_id, message) => {
    let result = '';
    fs.readFile('tweet.txt', (err, filedata) => {
        if (err) throw err;

        let tweet_data = filedata.toString();
        let tweet_lines = tweet_data.split('\n');

        let number;
        tweet_lines.forEach((val, index) => {
            if (tweet_lines.length - 1 === index) {
                number = tweet_lines.length + 1;
            }
        })

        let data = `${number}-${user_id}-${source_id}-${message}`;
        tweet_lines.push(data);
        let newData = tweet_lines.join('\n');

        fs.writeFile('tweet.txt', newData, (err) => {
            if (err) throw err;
        });
    });

    return { message: `${message}` };
}

module.exports = {
    loadData: loadData,
    timeline: timeline,
    feed: feed,
    create_tweet: create_tweet,
    follow: follow,
};