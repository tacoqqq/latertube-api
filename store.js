const STORE = {
    GENRES: [
         {
             genre_id: 1,
             genre_title: 'Dessert Recipe',
             genre_created_time: new Date().toLocaleString()
         },
 
         {
             genre_id: 2,
             genre_title: 'Javascript Tutorial',
             genre_created_time: new Date().toLocaleString()
         }, 
 
         {
             genre_id: 3,
             genre_title: 'Stand-up Comedy',
             genre_created_time: new Date().toLocaleString()
         },
 
         {
             genre_id: 4,
             genre_title: 'Beyonce\'s Music Video',
             genre_created_time: new Date().toLocaleString()
         }
     ],
 
     VIDEOS: 
     [
         {
             video_id: 1,
             video_title: 'Matcha Basque Cheese Cake Recipe',
             video_thumbnail_url: 'https://img.youtube.com/vi/NRlYiTPPo7A/maxresdefault.jpg',
             video_url: 'https://www.youtube.com/watch?v=NRlYiTPPo7A',
             video_description: 'This recipe has more than 33k views. One of the most popular matcha basque cheesecake recipe videos on Youtube.',
             video_rating: 5,
             genre_id: 1,
             video_created_time: new Date().toLocaleString()
         },
         {
             video_id: 2,
             video_title: 'Easy flan / creme caramel',
             video_thumbnail_url: 'https://img.youtube.com/vi/tB55iAo3p2Y/maxresdefault.jpg',
             video_url: 'https://www.youtube.com/watch?v=tB55iAo3p2Y',
             video_description: 'Easy Flan/ creme caramel in three simple steps.',
             video_rating: 5,
             genre_id: 1,
             video_created_time: new Date().toLocaleString()
         },
         {
             video_id: 3,
             video_title: 'No Bake Oreo Cheesecake Bars',
             video_thumbnail_url: 'https://img.youtube.com/vi/RlYIlkZZMsM/maxresdefault.jpg',
             video_url: 'https://www.youtube.com/watch?v=RlYIlkZZMsM',
             video_description: 'These dense and creamy oreo cheesecake bars are incredibly delicious, made with a cookie base.',
             video_rating: 3,
             genre_id: 1,
             video_created_time: new Date().toLocaleString()
         },
         {
             video_id: 4,
             video_title: 'JavaScript Tutorial for Beginners',
             video_thumbnail_url: 'https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg',
             video_url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
             video_description: 'Learn JavaScript in 1 Hour [2020] (Programming with Mosh)',
             video_rating: 4,
             genre_id: 2,
             video_created_time: new Date().toLocaleString()
         },
         {
             video_id: 5,
             video_title: '8 Must Know JavaScript Array Methods',
             video_thumbnail_url: 'https://img.youtube.com/vi/R8rmfD9Y5-c/maxresdefault.jpg',
             video_url: 'https://www.youtube.com/watch?v=R8rmfD9Y5-c',
             video_description: 'Web Dev Simplified, learning filter, map, find, forEach, some, every, reduce, includes',
             video_rating: 3,
             genre_id: 2,
             video_created_time: new Date().toLocaleString()
         },
         {
             video_id: 6,
             video_title: 'Async Javascript Tutorial For Beginners',
             video_thumbnail_url: 'https://img.youtube.com/vi/_8gHHBlbziw/maxresdefault.jpg',
             video_url: 'https://www.youtube.com/watch?v=_8gHHBlbziw',
             video_description: 'Callbacks, Promises, Async Await',
             video_rating: 3,
             genre_id: 2,
             video_created_time: new Date().toLocaleString()
         },
         {
             video_id: 7,
             video_title: 'Trevor Noah: Lost in Translation',
             video_thumbnail_url: 'https://img.youtube.com/vi/eSYeaK3Y6tA/maxresdefault.jpg',
             video_url: 'https://www.youtube.com/watch?v=eSYeaK3Y6tA',
             video_description: 'In this special, Trevor Noah comments on everything from terrorism to police brutality to Ebola to his grandmother and discusses the origin of the cheer “woo-hoo.” (Contains strong language.)',
             video_rating: 5,
             genre_id: 3,
             video_created_time: new Date().toLocaleString()
         },
         {
             video_id: 8,
             video_title: 'Daniel Tosh\'s Standup Performance',
             video_thumbnail_url: 'https://img.youtube.com/vi/3Sbw0lZ9LmY/maxresdefault.jpg',
             video_url: 'https://www.youtube.com/watch?v=3Sbw0lZ9LmY',
             video_description: 'Daniel Tosh wonders why Americans still think they live in the greatest country in the world and tries to understand how so many people are employed. (Contains strong language.)',
             video_rating: 5,
             genre_id: 3,
             video_created_time: new Date().toLocaleString()
         },
         {
             video_id: 9,
             video_title: 'Beyoncé - Hold Up',
             video_thumbnail_url: 'https://img.youtube.com/vi/PeonBmeFR8o/maxresdefault.jpg',
             video_url: 'https://www.youtube.com/watch?v=PeonBmeFR8o',
             video_description: 'Queen B! This video has 184M views so far.',
             video_rating: 5,
             genre_id: 4,
             video_created_time: new Date().toLocaleString()
         },
         {
             video_id: 10,
             video_title: 'Beyoncé - Let\'s Move Your Body',
             video_thumbnail_url: 'https://img.youtube.com/vi/fqzNRchjm-k/maxresdefault.jpg',
             video_url: 'https://www.youtube.com/watch?v=fqzNRchjm-k',
             video_description: 'Queen B! This video has 35M views so far.',
             video_rating: 3,
             genre_id: 4,
             video_created_time: new Date().toLocaleString()
         },
     ]
 }
 
 
module.exports = { STORE }