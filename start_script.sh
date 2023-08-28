cd server;
npm run start &
pid=$!;
# disown;
cd ..;
cd client;
npm run start;
kill -9 $pid;