<template>
  <div class="container py-5">
    <!-- Nav Tab -->
    <nav-tabs />

    <h1 class="mt-5">
      News Feed
    </h1>
    <div class="row">
      <!-- Latest Restaurants -->
      <div class="col-md-6">
        <h3>Latest Restaurants</h3>
        <latest-restaurants :restaurants="restaurants" />
      </div>
      <!-- Latest Comments-->
      <div class="col-md-6">
        <h3>Latest Comments</h3>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue';
import LatestRestaurants from '../components/LatestRestaurant.vue';

const dummyData = {
  restaurants: [
    {
      id: 1314,
      name: 'Essie Treutel',
      tel: '1-317-231-6827 x39718',
      address: "1412 O'Kon Harbor",
      opening_hours: '08:00',
      description: 'ab',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=808',
      CategoryId: 21,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:13.000Z',
      updatedAt: '2021-04-06T18:12:13.000Z',
      Category: {
        id: 21,
        name: '義大利料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      }
    },
    {
      id: 1324,
      name: 'Deanna Morar',
      tel: '709-207-9353 x936',
      address: '329 Nikolaus Neck',
      opening_hours: '08:00',
      description:
        'Eaque autem enim. Aut nihil et voluptas est ducimus omnis error. Pariatur id omnis ea iste adipisci harum enim.',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=858',
      CategoryId: 41,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:13.000Z',
      updatedAt: '2021-04-06T18:12:13.000Z',
      Category: null
    },
    {
      id: 1334,
      name: 'Courtney Harber',
      tel: '1-977-645-8525 x78109',
      address: '04909 Wisozk Greens',
      opening_hours: '08:00',
      description:
        'Et amet molestiae molestiae tenetur. Dolor error est molestiae. Culpa nihil ut omnis. Voluptas quia qui rem ipsam ratione. Nobis perspiciatis atque. Dolorum iste magnam nulla explicabo ex aliquid.\n \rReiciendis dolorum quia tempore quam illo. Ducimus optio rerum reprehenderit alias rerum quidem molestiae. Fugit repellendus sapiente. Sed fuga nisi nam rerum soluta temporibus natus harum quo. Quas consectetur sed. Quia non esse facilis.\n \rEx perspiciatis rerum vero. Et modi et omnis ipsam unde perferendis a quam mollitia. Fugit tempore perferendis iusto rerum consequatur consequatur autem. Ducimus est pariatur recusandae atque quo.',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=577',
      CategoryId: 11,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:13.000Z',
      updatedAt: '2021-04-06T18:12:13.000Z',
      Category: {
        id: 11,
        name: '日本料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      }
    },
    {
      id: 1344,
      name: 'Alberta McLaughlin',
      tel: '721.267.1479 x194',
      address: '98609 Hirthe Terrace',
      opening_hours: '08:00',
      description: 'voluptas',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=330',
      CategoryId: 41,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:13.000Z',
      updatedAt: '2021-04-06T18:12:13.000Z',
      Category: {
        id: 41,
        name: '素食料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      }
    },
    {
      id: 1354,
      name: 'Muriel Abernathy DVM',
      tel: '740-836-4076 x85111',
      address: '5135 Sydnee Shoal',
      opening_hours: '08:00',
      description:
        'Nisi et quaerat qui fugit modi totam ut sequi praesentium. Aut est in ratione. Explicabo animi dignissimos non eum totam. Odio culpa quaerat dolores dolores sit impedit ab a. In ut aut iusto.\n \rBeatae qui perspiciatis facilis suscipit sint adipisci odit quia. Fuga qui dolor illum non mollitia nihil. Earum esse odit. Eum minima beatae adipisci deleniti ipsum praesentium occaecati maiores. Voluptas sint et sunt et corrupti repellendus illum. Non hic asperiores sit nulla impedit.\n \rUt aut quae sint labore officia consequatur occaecati assumenda nemo. Consequatur saepe id enim et doloremque explicabo quia numquam deserunt. Neque fuga numquam architecto non qui ipsam voluptatum excepturi in. Veniam deleniti recusandae. Ratione dolores dolorum quia aut et voluptatibus sunt et eaque. Officiis quam ad architecto reiciendis rerum et maxime similique.',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=118',
      CategoryId: 21,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:13.000Z',
      updatedAt: '2021-04-06T18:12:13.000Z',
      Category: {
        id: 21,
        name: '義大利料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      }
    },
    {
      id: 1364,
      name: 'Alison Cole',
      tel: '(511) 744-3710',
      address: '0309 Wintheiser Parks',
      opening_hours: '08:00',
      description:
        'Totam ut odit unde ut vel tenetur ipsum.\nExpedita laudantium recusandae est et porro vel.\nTotam ut reiciendis tenetur autem.',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=268',
      CategoryId: 31,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:13.000Z',
      updatedAt: '2021-04-06T18:12:13.000Z',
      Category: {
        id: 31,
        name: '墨西哥料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      }
    },
    {
      id: 1374,
      name: 'Harold Cronin',
      tel: '1-349-481-1940',
      address: '889 Maiya Rapids',
      opening_hours: '08:00',
      description: 'Adipisci amet est neque et fugiat quia.',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=333',
      CategoryId: 1,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:13.000Z',
      updatedAt: '2021-04-06T18:12:13.000Z',
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      }
    },
    {
      id: 1384,
      name: 'Lance Bahringer',
      tel: '872.663.4762',
      address: '320 Kacey Green',
      opening_hours: '08:00',
      description:
        'Qui facere sit id quaerat qui aliquid porro iure debitis. Vero voluptates alias.',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=521',
      CategoryId: 11,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:13.000Z',
      updatedAt: '2021-04-06T18:12:13.000Z',
      Category: {
        id: 11,
        name: '日本料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      }
    },
    {
      id: 1394,
      name: 'Pedro Hoppe DDS',
      tel: '1-778-683-9353 x98693',
      address: '8771 Wehner Trail',
      opening_hours: '08:00',
      description: 'omnis',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=376',
      CategoryId: 1,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:13.000Z',
      updatedAt: '2021-04-06T18:12:13.000Z',
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      }
    },
    {
      id: 1404,
      name: 'Jaime Abshire',
      tel: '(838) 766-0814',
      address: '049 Schroeder Mill',
      opening_hours: '08:00',
      description:
        'Quae id rerum earum. Fugiat nemo repudiandae beatae corrupti. Quod est vel molestias suscipit. Eum est est ipsa perspiciatis doloremque laborum aspernatur tempora rerum.\n \rConsequatur corrupti quisquam rerum asperiores eveniet aspernatur nesciunt dolor et. Numquam sunt consequatur vitae voluptatum quidem praesentium velit sunt temporibus. Placeat amet autem repudiandae expedita. Voluptas tempora culpa. Cum explicabo autem dolor cupiditate ut et adipisci.\n \rSimilique iusto nesciunt voluptatem sunt sint aut et. Debitis et ut quos qui atque. Et quam consequatur velit.',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=439',
      CategoryId: 51,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:13.000Z',
      updatedAt: '2021-04-06T18:12:13.000Z',
      Category: {
        id: 51,
        name: '美式料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      }
    }
  ],
  comments: [
    {
      id: 194,
      text:
        'Excepturi voluptatemExcepturi voluptatemExcepturi voluptatemExcepturi voluptatemExcepturi voluptatemExcepturi voluptatemv',
      UserId: 34,
      RestaurantId: 1444,
      createdAt: '2021-04-09T22:30:26.000Z',
      updatedAt: '2021-04-09T22:30:26.000Z',
      User: {
        id: 34,
        name: 'root',
        email: 'root@example.com',
        password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
        isAdmin: 1,
        image: 'https://i.imgur.com/1jDf2Me.png',
        createdAt: '2021-04-06T00:19:36.000Z',
        updatedAt: '2021-04-17T19:31:04.000Z'
      },
      Restaurant: {
        id: 1444,
        name: 'Leslie Schamberger',
        tel: '621.331.9846 x66256',
        address: '3675 Frederick Garden',
        opening_hours: '08:00',
        description:
          'Esse placeat ea ut et quam optio quo. Quas molestiae esse perferendis dolorum qui inventore qui sint qui. Nobis possimus enim. Ut totam sapiente suscipit optio itaque non.',
        image: 'https://loremflickr.com/320/240/restaurant,food?lock=883',
        CategoryId: 21,
        viewCounts: 10,
        createdAt: '2021-04-06T18:12:13.000Z',
        updatedAt: '2021-04-09T22:30:20.000Z'
      }
    },
    {
      id: 21,
      text: 'Excepturi voluptatem',
      UserId: 34,
      RestaurantId: 1444,
      createdAt: '2021-04-06T18:14:41.000Z',
      updatedAt: '2021-04-06T18:14:41.000Z',
      User: {
        id: 34,
        name: 'root',
        email: 'root@example.com',
        password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
        isAdmin: 1,
        image: 'https://i.imgur.com/1jDf2Me.png',
        createdAt: '2021-04-06T00:19:36.000Z',
        updatedAt: '2021-04-17T19:31:04.000Z'
      },
      Restaurant: {
        id: 1444,
        name: 'Leslie Schamberger',
        tel: '621.331.9846 x66256',
        address: '3675 Frederick Garden',
        opening_hours: '08:00',
        description:
          'Esse placeat ea ut et quam optio quo. Quas molestiae esse perferendis dolorum qui inventore qui sint qui. Nobis possimus enim. Ut totam sapiente suscipit optio itaque non.',
        image: 'https://loremflickr.com/320/240/restaurant,food?lock=883',
        CategoryId: 21,
        viewCounts: 10,
        createdAt: '2021-04-06T18:12:13.000Z',
        updatedAt: '2021-04-09T22:30:20.000Z'
      }
    },
    {
      id: 41,
      text: 'Ea sed sunt aut vita',
      UserId: 34,
      RestaurantId: 1084,
      createdAt: '2021-04-06T18:14:41.000Z',
      updatedAt: '2021-04-06T18:14:41.000Z',
      User: {
        id: 34,
        name: 'root',
        email: 'root@example.com',
        password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
        isAdmin: 1,
        image: 'https://i.imgur.com/1jDf2Me.png',
        createdAt: '2021-04-06T00:19:36.000Z',
        updatedAt: '2021-04-17T19:31:04.000Z'
      },
      Restaurant: {
        id: 1084,
        name: 'Henry Strosin',
        tel: '561-868-2752',
        address: '3375 Louvenia Village',
        opening_hours: '08:00',
        description: 'Debitis aut itaque mollitia eos omnis fugit omnis soluta a.',
        image: 'https://loremflickr.com/320/240/restaurant,food?lock=930',
        CategoryId: 11,
        viewCounts: 1,
        createdAt: '2021-04-06T18:12:12.000Z',
        updatedAt: '2021-04-10T22:01:01.000Z'
      }
    },
    {
      id: 91,
      text: 'Voluptatem ut ducimu',
      UserId: 34,
      RestaurantId: 1504,
      createdAt: '2021-04-06T18:14:41.000Z',
      updatedAt: '2021-04-06T18:14:41.000Z',
      User: {
        id: 34,
        name: 'root',
        email: 'root@example.com',
        password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
        isAdmin: 1,
        image: 'https://i.imgur.com/1jDf2Me.png',
        createdAt: '2021-04-06T00:19:36.000Z',
        updatedAt: '2021-04-17T19:31:04.000Z'
      },
      Restaurant: {
        id: 1504,
        name: 'Todd Pagac',
        tel: '481.730.5485',
        address: '1940 Evie Fall',
        opening_hours: '08:00',
        description: 'Laboriosam neque illum eum.',
        image: 'https://loremflickr.com/320/240/restaurant,food?lock=762',
        CategoryId: 41,
        viewCounts: 3,
        createdAt: '2021-04-06T18:12:13.000Z',
        updatedAt: '2021-04-07T01:11:37.000Z'
      }
    },
    {
      id: 101,
      text: 'Delectus iusto quia ',
      UserId: 34,
      RestaurantId: 1364,
      createdAt: '2021-04-06T18:14:41.000Z',
      updatedAt: '2021-04-06T18:14:41.000Z',
      User: {
        id: 34,
        name: 'root',
        email: 'root@example.com',
        password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
        isAdmin: 1,
        image: 'https://i.imgur.com/1jDf2Me.png',
        createdAt: '2021-04-06T00:19:36.000Z',
        updatedAt: '2021-04-17T19:31:04.000Z'
      },
      Restaurant: {
        id: 1364,
        name: 'Alison Cole',
        tel: '(511) 744-3710',
        address: '0309 Wintheiser Parks',
        opening_hours: '08:00',
        description:
          'Totam ut odit unde ut vel tenetur ipsum.\nExpedita laudantium recusandae est et porro vel.\nTotam ut reiciendis tenetur autem.',
        image: 'https://loremflickr.com/320/240/restaurant,food?lock=268',
        CategoryId: 31,
        viewCounts: null,
        createdAt: '2021-04-06T18:12:13.000Z',
        updatedAt: '2021-04-06T18:12:13.000Z'
      }
    },
    {
      id: 141,
      text: 'Vitae itaque qui sed',
      UserId: 34,
      RestaurantId: 1484,
      createdAt: '2021-04-06T18:14:41.000Z',
      updatedAt: '2021-04-06T18:14:41.000Z',
      User: {
        id: 34,
        name: 'root',
        email: 'root@example.com',
        password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
        isAdmin: 1,
        image: 'https://i.imgur.com/1jDf2Me.png',
        createdAt: '2021-04-06T00:19:36.000Z',
        updatedAt: '2021-04-17T19:31:04.000Z'
      },
      Restaurant: {
        id: 1484,
        name: 'Aaron Treutel',
        tel: '(766) 637-6645 x917',
        address: '52750 Hodkiewicz Stream',
        opening_hours: '08:00',
        description:
          'Accusantium laboriosam nobis consectetur explicabo in vel animi sed nesciunt.\nRerum blanditiis atque quas eos possimus aut dolores.',
        image: 'https://loremflickr.com/320/240/restaurant,food?lock=78',
        CategoryId: 1,
        viewCounts: 3,
        createdAt: '2021-04-06T18:12:13.000Z',
        updatedAt: '2021-04-10T00:42:40.000Z'
      }
    },
    {
      id: 31,
      text: 'Cumque vitae id poss',
      UserId: 44,
      RestaurantId: 1104,
      createdAt: '2021-04-06T18:14:41.000Z',
      updatedAt: '2021-04-06T18:14:41.000Z',
      User: {
        id: 44,
        name: 'user1',
        email: 'user1@example.com',
        password: '$2a$10$QeeBEuHzbDV/nUagZk0KHe2.Kr4uAjxWhxJfDCQOgX2ZqDXID35W.',
        isAdmin: 0,
        image: 'https://i.imgur.com/zadqwVq.png',
        createdAt: '2021-04-06T00:19:36.000Z',
        updatedAt: '2021-04-06T00:26:32.000Z'
      },
      Restaurant: {
        id: 1104,
        name: 'Katherine Prosacco',
        tel: '251-313-1899',
        address: '7440 Jaren Plains',
        opening_hours: '08:00',
        description:
          'Rerum expedita ad nostrum distinctio a tempora expedita velit. Voluptatem neque suscipit. Et ab sequi a est et nemo voluptatem reiciendis. Dolor incidunt culpa.',
        image: 'https://loremflickr.com/320/240/restaurant,food?lock=215',
        CategoryId: 1,
        viewCounts: 1,
        createdAt: '2021-04-06T18:12:12.000Z',
        updatedAt: '2021-04-09T10:41:32.000Z'
      }
    },
    {
      id: 61,
      text: 'Tempore ut ex. Vitae',
      UserId: 44,
      RestaurantId: 1224,
      createdAt: '2021-04-06T18:14:41.000Z',
      updatedAt: '2021-04-06T18:14:41.000Z',
      User: {
        id: 44,
        name: 'user1',
        email: 'user1@example.com',
        password: '$2a$10$QeeBEuHzbDV/nUagZk0KHe2.Kr4uAjxWhxJfDCQOgX2ZqDXID35W.',
        isAdmin: 0,
        image: 'https://i.imgur.com/zadqwVq.png',
        createdAt: '2021-04-06T00:19:36.000Z',
        updatedAt: '2021-04-06T00:26:32.000Z'
      },
      Restaurant: {
        id: 1224,
        name: 'Ronald Bahringer',
        tel: '523.673.1724 x0845',
        address: '551 Stacey Common',
        opening_hours: '08:00',
        description: 'et',
        image: 'https://loremflickr.com/320/240/restaurant,food?lock=377',
        CategoryId: 31,
        viewCounts: null,
        createdAt: '2021-04-06T18:12:12.000Z',
        updatedAt: '2021-04-06T18:12:12.000Z'
      }
    },
    {
      id: 111,
      text: 'Quidem officia moles',
      UserId: 44,
      RestaurantId: 1094,
      createdAt: '2021-04-06T18:14:41.000Z',
      updatedAt: '2021-04-06T18:14:41.000Z',
      User: {
        id: 44,
        name: 'user1',
        email: 'user1@example.com',
        password: '$2a$10$QeeBEuHzbDV/nUagZk0KHe2.Kr4uAjxWhxJfDCQOgX2ZqDXID35W.',
        isAdmin: 0,
        image: 'https://i.imgur.com/zadqwVq.png',
        createdAt: '2021-04-06T00:19:36.000Z',
        updatedAt: '2021-04-06T00:26:32.000Z'
      },
      Restaurant: {
        id: 1094,
        name: 'Marshall Shields',
        tel: '872.298.6724 x661',
        address: '04399 Hauck Haven',
        opening_hours: '08:00',
        description: 'accusantium odit vel',
        image: 'https://loremflickr.com/320/240/restaurant,food?lock=85',
        CategoryId: 21,
        viewCounts: null,
        createdAt: '2021-04-06T18:12:12.000Z',
        updatedAt: '2021-04-06T18:12:12.000Z'
      }
    },
    {
      id: 121,
      text: 'Quia assumenda modi ',
      UserId: 44,
      RestaurantId: 1254,
      createdAt: '2021-04-06T18:14:41.000Z',
      updatedAt: '2021-04-06T18:14:41.000Z',
      User: {
        id: 44,
        name: 'user1',
        email: 'user1@example.com',
        password: '$2a$10$QeeBEuHzbDV/nUagZk0KHe2.Kr4uAjxWhxJfDCQOgX2ZqDXID35W.',
        isAdmin: 0,
        image: 'https://i.imgur.com/zadqwVq.png',
        createdAt: '2021-04-06T00:19:36.000Z',
        updatedAt: '2021-04-06T00:26:32.000Z'
      },
      Restaurant: {
        id: 1254,
        name: 'Billy Hirthe',
        tel: '(316) 514-3514',
        address: '429 Lexie Motorway',
        opening_hours: '08:00',
        description: 'dolorum',
        image: 'https://loremflickr.com/320/240/restaurant,food?lock=128',
        CategoryId: 1,
        viewCounts: null,
        createdAt: '2021-04-06T18:12:12.000Z',
        updatedAt: '2021-04-06T18:12:12.000Z'
      }
    }
  ]
};

export default {
  name: 'RestaurantsFeed',
  data() {
    return {
      restaurants: [],
      comments: []
    };
  },
  components: {
    NavTabs,
    LatestRestaurants
  },
  methods: {
    fetchFeed() {
      const { restaurants, comments } = dummyData;
      this.restaurants = restaurants;
      this.comments = comments;
    }
  },
  created() {
    this.fetchFeed();
  }
};
</script>
