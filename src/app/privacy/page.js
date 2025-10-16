// app/privacy/page.js
"use client";

import { Box, Typography, Button, Container } from "@mui/material";

export default function PrivacyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Политика конфиденциальности
      </Typography>

      <Typography variant="body1" paragraph>
        Мы, компания <strong>Негабаритика</strong>, уважаем вашу
        конфиденциальность и обязуемся защищать личные данные, которые вы
        предоставляете через наш веб-сайт.
      </Typography>

      <Typography variant="h6" gutterBottom>
        1. Какие данные мы собираем
      </Typography>
      <Typography variant="body1" paragraph>
        При заполнении формы заявки мы собираем только те данные, которые вы
        самостоятельно вводите: имя, контактный телефон, e-mail, название
        организации (по желанию), сообщение/комментарий и данные о грузе
        (наименование, параметры).
      </Typography>

      <Typography variant="h6" gutterBottom>
        2. Цель обработки данных
      </Typography>
      <Typography variant="body1" paragraph>
        Ваши данные используются исключительно для обработки вашей заявки и
        связи с вами для уточнения деталей. Мы не используем их для рассылок или
        маркетинга без вашего отдельного согласия.
      </Typography>

      <Typography variant="h6" gutterBottom>
        3. Срок хранения данных
      </Typography>
      <Typography variant="body1" paragraph>
        Мы храним ваши данные только на время обработки заявки и, если это
        необходимо, для внутреннего учета компании.
      </Typography>

      <Typography variant="h6" gutterBottom>
        4. Передача данных третьим лицам
      </Typography>
      <Typography variant="body1" paragraph>
        Ваши данные не передаются третьим лицам, за исключением случаев,
        предусмотренных законодательством.
      </Typography>

      <Typography variant="h6" gutterBottom>
        5. Права пользователя
      </Typography>
      <Typography variant="body1" paragraph>
        Вы можете в любой момент:
        <ul>
          <li>Запросить удаление своих данных</li>
          <li>Отозвать согласие на обработку данных</li>
          <li>Получить информацию о том, какие данные мы храним</li>
        </ul>
      </Typography>

      <Typography variant="h6" gutterBottom>
        6. Безопасность данных
      </Typography>
      <Typography variant="body1" paragraph>
        Мы принимаем все необходимые меры для защиты ваших данных от
        несанкционированного доступа, утраты или изменения.
      </Typography>

      <Typography variant="body1" paragraph>
        Если у вас есть вопросы по обработке данных, вы можете связаться с нами
        по e-mail: <strong>info@negabaritika.ru</strong>
      </Typography>
    </Container>
  );
}
