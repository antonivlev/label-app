/seestore response = {
  data_list: [
    // first file object
    {x:
      [   //zoom levels. sensor values in buckets (pixels)
          [...[12.3, 13.4]...],
          [...[11.3, 15.4]...],
          ...
          [...[10.6, 12.1]...]
      ],
      y: [...],
      z: [...],
    },
    // next file object
    ...
    {...}
  ]

  // tvals are the same for every dimension in every file
  tvals: [
    // zoom levels
    [...[1481717824451, 1481717825261]...]
    [...]
    ...
    [...]
  ]

  file_list: ['watch.txt', 'myo.txt', ...]
}
