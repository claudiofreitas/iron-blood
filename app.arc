@app
iron-blood-b556

@aws
region ap-northeast-1

@http
/*
  method any
  src server

@static

@tables
user
  pk *String

password
  pk *String 

note
  pk *String  # userId
  sk **String # noteId

train
  trainId *String 

interested
  userId *String
  trainId **String

ridden
  userId *String # userId
  trainId **String # trainId

prefectures
  prefectureId *String