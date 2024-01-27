const request = require("supertest");
const server = require("../index");

// Pruebas para las operaciones CRUD de cafés
describe("Operaciones CRUD de cafes", () => {

    // Requisito 1: Prueba que la ruta GET /cafes devuelve un status code 200 y un arreglo con al menos 1 objeto (3 Puntos)
    describe("Pruebas para la ruta GET /cafes", () => {
        it("Debería retornar status code 200 y un arreglo con al menos 1 objeto", async () => {
            const response = await request(server).get("/cafes").send();
            const status = response.status;
            const cafes = response.body;

            expect(status).toBe(200);
            expect(Array.isArray(cafes)).toBe(true);
            expect(cafes.length).toBeGreaterThanOrEqual(1);
        });
    });

    // Requisito 2: Prueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe (2 Puntos)
    it("Eliminar café id inexistente", async () => {
        const jwt = "token";
        const id = 0;
        const response = await request(server)
            .delete(`/cafes/${id}`)
            .set("Authorization", jwt)
            .send();
        
        expect(response.statusCode).toBe(404);
    });

    // Requisito 3: Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201 (2 Puntos)
    describe("Prueba para la ruta POST /cafes", () => {
        it("Debería agregar un nuevo café y devolver un código 201", async () => {
            const jwt = "token"; // Token de autenticación ficticio
            const nuevoCafe = {
                nombre: "Café Nuevo"
                // Otros campos del café...
            };
        
            const response = await request(server)
                .post("/cafes")
                .set("Authorization", jwt)
                .send(nuevoCafe);
        
            expect(response.statusCode).toBe(201);
        });
    });

    // Requisito 4: Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload (3 Puntos)
    describe("Actualiza un café con id diferente", () => {
        it("Debería retornar status code 400 porque el id es diferente", async () => {
            const response = await request(server)
                .put("/cafes/20")
                .send({
                    id: 10,
                    nombre: "Café con ...",                
                });
            expect(response.status).toBe(400);
        });
    });
});
