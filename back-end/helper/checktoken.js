const jwt = require('jsonwebtoken')

const checktoken = (req , res, next) =>{
    try {
        //đọc token từ header
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            throw new Error('Token khong hợp lệ')
        }else{
            // giải mã token
            // sai token , sai key, hết hạn token
            jwt.verify(token, 'secret', (error, decode) =>{
                if (error) {
                    throw new Error ('Token không hợp lệ')
                }else{
                    // lưu  thông tin giải mã vào req để sử dụng ở các api khác
                    req.user  = decode
                    console.log('decode', decode);
                    next()
                }
            })
        }
    } catch (error) {
        console.log('Lỗi check token', error);
        return res.status(500).json({status : false, mess: error})

    }
} 
module.exports = checktoken