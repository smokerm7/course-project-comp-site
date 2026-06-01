# Установка на Windows (обязательно JDK 17)

## Ошибка BUILD FAILURE / class file version 61.0

Это значит: Maven запускается на **Java 8**, а проекту нужна **Java 17+**.

Проверка в PowerShell:

```powershell
java -version
```

Если видите `1.8.0` — нужно установить JDK 17.

---

## Шаг 1 — JDK 17

1. Скачайте **Microsoft OpenJDK 17** (Windows x64, `.msi`):  
   https://learn.microsoft.com/ru-ru/java/openjdk/download  
2. Установите. Если есть опция **Set JAVA_HOME** — включите.  
3. **Закройте все окна PowerShell/CMD** и откройте новое.  
4. Снова: `java -version` — должно быть `17.x` или `21.x`.

Если `java -version` показывает **17**, но Maven падает с **class file version 52.0** — в системе остался старый **JAVA_HOME** на Java 8.

**Быстрое решение (без настройки Windows):**

```powershell
cd "C:\Users\arbi9\OneDrive\Рабочий стол\MS7-COMP\backend"
.\run-dev.cmd
```

или `.\mvnw17.cmd spring-boot:run` — скрипт сам подставит JDK 17.

**Постоянное решение:** Панель управления → Переменные среды → удалите `JAVA_HOME` = `jre1.8.0_51` → укажите папку JDK 17, например `C:\Program Files\Microsoft\jdk-17.0.19.7-hotspot` (ваш путь может отличаться).

Найти папку: в PowerShell `Get-ChildItem "C:\Program Files\Microsoft" -Filter "jdk*"`

---

## Шаг 2 — Backend

```powershell
cd "C:\Users\arbi9\OneDrive\Рабочий стол\MS7-COMP\backend"
.\run-dev.cmd
```

Успех: в конце строка `Started Ms7CompApplication`.

Проверка в браузере: http://localhost:8080/api/health

---

## Шаг 3 — Frontend

```powershell
cd "C:\Users\arbi9\OneDrive\Рабочий стол\MS7-COMP\frontend"
npm install
npm run dev
```

Сайт: http://localhost:5173  

Вход: используйте логин и пароль, выданные администратором проекта.


**Студент:** Хизриев Магомед-Салах Алиевич

**Группа:** ПИЖ-б-о-23-2
