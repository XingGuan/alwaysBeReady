
`swiper` 多图堆叠轮播 必要属性

```
import { A11y, Autoplay, Pagination, EffectCreative } from 'swiper/modules'

slideChangeTransitionEnd  


      :effect="'fade'"
      :fadeEffect="{
        crossFade: true
      }"


      :initialSlide="2"
      :slidesPerView="2"
      :centeredSlides="true"
      :grabCursor="true"
      :effect="'creative'"
      :creativeEffect="creativeEffect"
          const creativeEffect = reactive({
      prev: {
        translate: ['-40%', 0, 0], // 偏移量
        origin: 'center center',
        scale: 0.9, // 缩放量
        opacity: 0.8,
        shadow: true // 是否加阴影
      },
      next: {
        translate: ['40%', 0, 0],
        origin: 'center center',
        scale: 0.9,
        opacity: 0.8,
        shadow: true
      },
      // limitProgress: Math.floor(9 / 2),
      limitProgress: 1, // 显示五个堆叠的最重要的这个属性，后面依次以前面属性等比配置
      shadowPerProgress: true //是否等比配置透明度
    })


      const creativeEffect = reactive({
      prev: {
        shadow: true,
        origin: 'left center',
        translate: ['-5%', 0, -200],
        rotate: [0, 100, 0]
      },
      next: {
        origin: 'right center',
        translate: ['5%', 0, -200],
        rotate: [0, -100, 0]
      }
    })
```
