import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Task } from "../../components/TaskCard";

// Базовый RTK Query API slice для задач
export const tasksApi = createApi({
  reducerPath: "tasksApi", // имя под-редюсера в store
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api", // корень всех запросов
  }),

  tagTypes: ["Task"], // теги для автоматического обновления кэша

  endpoints: (builder) => ({
    // Получение списка задач
    getTasks: builder.query<Task[], void>({
      query: () => "tasks",
    }),
    // Создание новой задачи
    createTask: builder.mutation({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"], // обновляем кэш после создания
    }),
    // Обновление существующей задачи
    updateTask: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"], // обновляем кэш после обновления
    }),
    // Удаление задачи
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"], // обновляем кэш после удаления
    }),
  }),
});
// Экспортируем хуки для использования в компонентах
export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
