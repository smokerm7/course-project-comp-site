# PCMEF-диаграмма

```mermaid
flowchart TB
    P[Presentation: React + TypeScript UI]
    C[Control: Spring REST Controllers]
    M[Mediator: Services / Business Logic]
    E[Entity: JPA Entities / DTO]
    F[Foundation: Spring Data Repositories]
    DB[(PostgreSQL)]
    P --> C --> M --> E
    M --> F --> DB
    F --> E
```


**Студент:** Хизриев Магомед-Салах Алиевич

**Группа:** ПИЖ-б-о-23-2
