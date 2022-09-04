Playing now:

```
curl -X "GET" "https://api.spotify.com/v1/me/player/currently-playing" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQAKHi3DZA-tWV6oQP0mHem8O5RQniEDiCftfB7K_q2bijFByJ_cSKIYhk_Icx8phYgLV_LqPYpFTUgdCZI6mULhQUwUH2NLlhY5DGe7b0S9QWNJlLz7Dovuo0t8FqZnWebQESvA0_PmFvi8X2SbQtjq0I9KZtRNGtCPdexsGMrYTTVcLXhN23PYsQ"
```


Last 10 songs:

```
curl -X "GET" "https://api.spotify.com/v1/me/player/recently-played?limit=10" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQAKHi3DZA-tWV6oQP0mHem8O5RQniEDiCftfB7K_q2bijFByJ_cSKIYhk_Icx8phYgLV_LqPYpFTUgdCZI6mULhQUwUH2NLlhY5DGe7b0S9QWNJlLz7Dovuo0t8FqZnWebQESvA0_PmFvi8X2SbQtjq0I9KZtRNGtCPdexsGMrYTTVcLXhN23PYsQ"
```

Top long term tracks:

```
curl -X "GET" "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQAKHi3DZA-tWV6oQP0mHem8O5RQniEDiCftfB7K_q2bijFByJ_cSKIYhk_Icx8phYgLV_LqPYpFTUgdCZI6mULhQUwUH2NLlhY5DGe7b0S9QWNJlLz7Dovuo0t8FqZnWebQESvA0_PmFvi8X2SbQtjq0I9KZtRNGtCPdexsGMrYTTVcLXhN23PYsQ"
```


Top long term artists:

```
curl -X "GET" "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQAKHi3DZA-tWV6oQP0mHem8O5RQniEDiCftfB7K_q2bijFByJ_cSKIYhk_Icx8phYgLV_LqPYpFTUgdCZI6mULhQUwUH2NLlhY5DGe7b0S9QWNJlLz7Dovuo0t8FqZnWebQESvA0_PmFvi8X2SbQtjq0I9KZtRNGtCPdexsGMrYTTVcLXhN23PYsQ"
```


Cameras:
http://216.237.224.142/mjpg/video.mjpg?timestamp=1662251570374

http://199.231.169.155:8080/mjpg/video.mjpg

http://198.150.19.245/mjpg/video.mjpg

http://67.17.174.50:8001/mjpg/video.mjpg




1. Generate 3 background gradients each with two colors, different positions within a range
2. Generate what kind of backgrounds will be put on containers, and inner-containers pictures, live cameras, etc.
3. Generate background colors for all container-inner contents
4. Generate highlight text and link colors