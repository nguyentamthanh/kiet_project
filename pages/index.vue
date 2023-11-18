<template>
  <div class="h-full w-full bg-white p-2 flex flex-col">
    <div class="w-full flex flex-row relative">
      <canvas
        class="w-full h-full absolute top-0 pointer-events-none"
        id="canvas"
      ></canvas>
      <div class="w-full h-full flex items-center justify-center">
        <div class="w-1/2">
          <div v-for="(item, index) in list0" :key="index">
            <div class="mt-10 mx-12 w-30">
              <div class="flex justify-center">{{ item.content }}</div>
              <div
                class="p-3 w-30 bg-white h-30 cursor-pointer relative border rounded-lg text-center hover:(border-blue-300)"
                :id="'list0_' + item.id"
              >
                <img
                  :src="item.image"
                  class="w-fit h-full object-contain"
                  alt=""
                />
                <div
                  v-on:click.prevent
                  class="absolute w-5 h-5 right-0 top-1/2 bg-white border border-2 shadow-md rounded-full border-gray-300 transform translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="midpoint"
          class="p-3 w-20 flex justify-center items-center h-20 my-5 cursor-pointer relative border rounded-full text-center hover:(border-blue-300) bg-[#CBEBE0] relative"
          @click="displayPop = !displayPop"
        >
          <img
            src="https://icons.veryicon.com/png/o/miscellaneous/fs-icon/switch-38.png"
            alt=""
          />
          <div
            v-if="displayPop"
            class="absolute bg-white shadow-lg border border-gray-200 top-22 rounded-xl p-4 w-120 flex flex-col h-50"
          >
            <div class="flex justify-between">
              <div>Tracking Plan</div>
              <div class="px-2 py-1 bg-#FCDB6F rounded-full">Valid Event</div>
            </div>
          </div>
        </div>
        <div class="w-1/2 flex flex-col justify-end items-end">
          <div v-for="(item, index) in list1" :key="index">
            <div class="mt-5 mx-12 w-30">
              <div class="flex justify-center">{{ item.content }}</div>
              <div
                class="p-3 w-30 bg-white h-30 cursor-pointer relative border rounded-lg text-center hover:(border-blue-300)"
                :id="'list1_' + item.id"
              >
                <img
                  :src="item.image"
                  class="w-fit h-full object-contain"
                  alt=""
                />
                <div
                  class="absolute w-5 h-5 left-0 top-1/2 bg-white border border-2 shadow-md rounded-full border-gray-300 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const list0 = [
  {
    id: 1,
    content: "Android",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/Android_robot.png",
    group: 0,
  },
  {
    id: 2,
    content: "Web",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    group: 0,
  },
  {
    id: 3,
    content: "IOS",
    image:
      "https://cdn3.iconfinder.com/data/icons/social-media-logos-glyph/2048/5315_-_Apple-512.png",
    group: 0,
  },
];
const list1 = [
  {
    id: 1,
    content: "Analytics",
    image:
      "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/new_test.width-1200.format-webp.webp",
    group: 1,
  },
  {
    id: 2,
    content: "Messaging",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Google_Messages_icon_%282022%29.svg",
    group: 1,
  },
  {
    id: 3,
    content: "Warehouse",
    image:
      "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/ibm-512.png",
    group: 1,
  },
  {
    id: 4,
    content: "Advertising",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/16/Facebook-icon-1.png",
    group: 1,
  },
  {
    id: 5,
    content: "Sales/Support",
    image: "https://cdn-icons-png.flaticon.com/512/3600/3600990.png",
    group: 1,
  },
];
const start_pointer = ref("");
const end_pointer = ref("");
const debug_string = ref("nothing");
const connected_list = ref([]);
const displayPop = ref(false);
const colors = ["#CBEBE0"];
onMounted(() => {
  let midId = document.getElementById("midpoint");
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let g = [];
  list0.forEach((x) => {
    let id = document.getElementById(`list0_${x.id}`);
    let target = id;
    let start_pointer = {
      x:
        target.getBoundingClientRect().x -
        canvas.getBoundingClientRect().x +
        target.getBoundingClientRect().width,
      y:
        target.getBoundingClientRect().y -
        canvas.getBoundingClientRect().y +
        target.getBoundingClientRect().height / 2,
    };
    let end_pointer = {
      x: midId.getBoundingClientRect().x - canvas.getBoundingClientRect().x,
      y:
        midId.getBoundingClientRect().y -
        canvas.getBoundingClientRect().y +
        midId.getBoundingClientRect().height / 2,
    };
    g.push({
      p1: start_pointer,
      p2: end_pointer,
    });
  });
  list1.forEach((x) => {
    let id = document.getElementById(`list1_${x.id}`);
    let target = id;

    let start_pointer = {
      x: midId.getBoundingClientRect().x - canvas.getBoundingClientRect().x,
      y:
        midId.getBoundingClientRect().y -
        canvas.getBoundingClientRect().y +
        midId.getBoundingClientRect().height / 2,
    };
    let end_pointer = {
      x: target.getBoundingClientRect().x - canvas.getBoundingClientRect().x,
      y:
        target.getBoundingClientRect().y -
        canvas.getBoundingClientRect().y +
        target.getBoundingClientRect().height / 2,
    };
    g.push({
      p1: start_pointer,
      p2: end_pointer,
    });
  });
  draw1(g);
});
function draw1(g) {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  const container = canvas.parentNode; //Thay doi kich thuoc phan tu canvas phu hop voi bien cha
  let parent_pos = container.getBoundingClientRect(); // cung cap thong tin kic thuoc phan tu trong 1 khung hinh
  canvas.width = parent_pos.right - parent_pos.left; // tinh chieu dai va chieu cao cua canvas
  canvas.height = parent_pos.bottom - parent_pos.top;
  ctx.clearRect(0, 0, canvas.width, canvas.height); //dat kich
  for (let index = 0; index < g?.length; index++) {
    const x = g[index];
    console.log("🚀 ~ file: index.vue:165 ~ draw1 ~ x:", x);
    let p1 = x.p1;
    let p2 = x.p2;
    ctx.imageSmoothingEnabled = true;
    let start = { x: p1.x, y: p1.y };
    let cp1 = {
      x: (p2.x + p1.x) / 2,
      y: p1.y,
    };
    let cp2 = {
      x: (p1.x + p2.x) / 2,
      y: p2.y,
    };
    let end = { x: p2.x, y: p2.y };
    ctx.lineWidth = 15;
    ctx.beginPath();
    colors.forEach(function (element) {
      ctx.strokeStyle = element;
    });
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    ctx.stroke();
  }
}
function mouseClick(item, event) {
  let target = event.target;
  console.log("🚀 ~ file: index.vue:107 ~ mouseClick ~ target:", target);
  var canvas = document.getElementById("canvas");
  console.log("🚀 ~ file: index.vue:174 ~ mouseClick ~ canvas:", canvas);
  // let ctx = canvas.getContext("2d");
  if (item.group === 0) {
    start_pointer.value = {
      id: item.id,
      x:
        target.getBoundingClientRect().x -
        canvas.getBoundingClientRect().x +
        target.getBoundingClientRect().width,
      y:
        target.getBoundingClientRect().y -
        canvas.getBoundingClientRect().y +
        target.getBoundingClientRect().height / 2,
    };
    console.log(item.id);
  } else {
    end_pointer.value = {
      id: item.id,
      x: target.getBoundingClientRect().x - canvas.getBoundingClientRect().x,
      y:
        target.getBoundingClientRect().y -
        canvas.getBoundingClientRect().y +
        target.getBoundingClientRect().height / 2,
    };
    //remove
    connected_list.value = connected_list.value?.filter(
      (x) => x.p1.id != start_pointer.value?.id
    );
    connected_list.value = connected_list.value?.filter(
      (x) => x.p2.id != item.id
    );

    connected_list.value?.push({
      p1: start_pointer.value,
      p2: end_pointer.value,
    });

    start_pointer.value = "";
    end_pointer.value = "";
  }
  draw();
}
function draw() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  const container = canvas.parentNode; //Thay doi kich thuoc phan tu canvas phu hop voi bien cha
  let parent_pos = container.getBoundingClientRect(); // cung cap thong tin kic thuoc phan tu trong 1 khung hinh
  canvas.width = parent_pos.right - parent_pos.left; // tinh chieu dai va chieu cao cua canvas
  canvas.height = parent_pos.bottom - parent_pos.top;
  ctx.clearRect(0, 0, canvas.width, canvas.height); //dat kich thuoc hinh chu nhat mau den trong suot
  for (let index = 0; index < connected_list.value?.length; index++) {
    const x = connected_list.value[index];
    let p1 = x.p1;
    let p2 = x.p2;
    ctx.imageSmoothingEnabled = true;
    let start = { x: p1.x, y: p1.y };
    let cp1 = {
      x: (p2.x + p1.x) / 2,
      y: p1.y,
    };
    let cp2 = {
      x: (p1.x + p2.x) / 2,
      y: p2.y,
    };
    let end = { x: p2.x, y: p2.y };
    ctx.lineWidth = 5;
    ctx.beginPath();
    colors.forEach(function (element) {
      ctx.strokeStyle = element;
    });
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    ctx.stroke();
  }
}
</script>
