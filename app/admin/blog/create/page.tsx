"use client";

import { useState, useRef, RefCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { createBlogPost } from "@/services/blog.actions";
import type { BlogBlockType, MultilangText } from "@/models/blog.model";
import {
  Bold,
  Italic,
  Link,
  Heading2,
  Heading3,
  Heading4,
  Type,
  Image as ImageIcon,
  Tag,
} from "lucide-react";

interface LocalBlock {
  id: number;
  type: BlogBlockType;
  content: MultilangText;
  tags: MultilangText;
  order: number;
  file?: File | null;
  imageUrl?: string | null;
}

const blockTypes: { type: BlogBlockType; label: string; icon: React.ReactNode }[] = [
  { type: "h2", label: "Заголовок H2", icon: <Heading2 className="w-4 h-4" /> },
  { type: "h3", label: "Заголовок H3", icon: <Heading3 className="w-4 h-4" /> },
  { type: "h4", label: "Заголовок H4", icon: <Heading4 className="w-4 h-4" /> },
  { type: "text", label: "Текст", icon: <Type className="w-4 h-4" /> },
  { type: "image", label: "Изображение", icon: <ImageIcon className="w-4 h-4" /> },
  { type: "tags", label: "Теги", icon: <Tag className="w-4 h-4" /> },
];

const textFormattingButtons = [
  { label: "B", icon: <Bold className="w-4 h-4" />, tag: "<strong></strong>", title: "Жирный" },
  { label: "I", icon: <Italic className="w-4 h-4" />, tag: "<em></em>", title: "Курсив" },
  { label: "Link", icon: <Link className="w-4 h-4" />, tag: '<a href=""></a>', title: "Ссылка" },
];

export default function CreateBlogPage() {
  const [blocks, setBlocks] = useState<LocalBlock[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  function addBlock(type: BlogBlockType) {
    setBlocks((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        content: { ru: "", uk: "" },
        tags: { ru: "", uk: "" },
        order: prev.length,
        file: null,
        imageUrl: null,
      },
    ]);
  }

  function updateBlock<K extends keyof LocalBlock>(id: number, key: K, value: LocalBlock[K]) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, [key]: value } : b)));
  }

  function removeBlock(id: number) {
    setBlocks((prev) => prev.filter((b) => b.id !== id).map((b, i) => ({ ...b, order: i })));
  }

  const createTextareaRef = (
    index: number,
    langIndex: number,
  ): RefCallback<HTMLTextAreaElement> => {
    return (el: HTMLTextAreaElement | null) => {
      textareaRefs.current[index * 2 + langIndex] = el;
    };
  };

  function insertTextAtCursor(lang: keyof MultilangText, id: number, text: string) {
    const blockIndex = blocks.findIndex((b) => b.id === id);
    if (blockIndex === -1) return;

    const langIndex = lang === "ru" ? 0 : 1;
    const textarea = textareaRefs.current[blockIndex * 2 + langIndex];
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;
    const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);

    updateBlock(id, "content", {
      ...blocks[blockIndex].content,
      [lang]: newValue,
    });

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + text.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const processedBlocks = blocks.map((block) => {
        const baseBlock = {
          type: block.type,
          order: block.order,
        };

        if (block.type === "text" || block.type.startsWith("h")) {
          return {
            ...baseBlock,
            content: block.content,
          };
        }

        if (block.type === "tags") {
          return {
            ...baseBlock,
            tags: {
              ru: block.tags.ru
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t),
              uk: block.tags.uk
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t),
            },
          };
        }

        if (block.type === "image") {
          return {
            ...baseBlock,
            imageUrl: block.imageUrl,
          };
        }

        return baseBlock;
      });

      formData.append("blocks", JSON.stringify(processedBlocks));

      blocks.forEach((b, index) => {
        if (b.file) {
          formData.append(`file_${index}`, b.file);
        }
      });

      const res = await createBlogPost(formData);
      console.log("Post created:", res);

      setBlocks([]);
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-20 max-w-4xl mx-auto px-4 pb-20">
      <h1 className="text-3xl font-bold mb-8">Создать пост</h1>

      <form ref={formRef} onSubmit={submitForm} className="space-y-8">
        <div className="space-y-6  p-6 rounded-xl border shadow-sm">
          <h2 className="text-xl font-semibold">Основная информация</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="font-medium block">
                Заголовок (RU) <span className="text-red-500">*</span>
              </label>
              <Input name="title_ru" required placeholder="Введите заголовок на русском" />
            </div>

            <div className="space-y-3">
              <label className="font-medium block">
                Заголовок (UK) <span className="text-red-500">*</span>
              </label>
              <Input name="title_uk" required placeholder="Введіть заголовок українською" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Контент блога</h2>
            <div className="text-sm text-muted-foreground">{blocks.length} блоков</div>
          </div>

          <div className="space-y-6">
            {blocks.map((block, index) => (
              <div key={block.id} className=" border rounded-xl shadow-sm overflow-hidden">
                <div className="border-b p-4 flex items-center justify-between ">
                  <div className="flex items-center gap-3">
                    {blockTypes.find((t) => t.type === block.type)?.icon}
                    <h3 className="font-semibold">
                      {blockTypes.find((t) => t.type === block.type)?.label}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeBlock(block.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                    title="Удалить блок"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6">
                  {(block.type === "h2" ||
                    block.type === "h3" ||
                    block.type === "h4" ||
                    block.type === "text") && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="font-medium">Текст (RU)</label>
                          {block.type === "text" && (
                            <div className="flex gap-1">
                              {textFormattingButtons.map((btn, i) => (
                                <Button
                                  key={i}
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => insertTextAtCursor("ru", block.id, btn.tag)}
                                  title={btn.title}
                                >
                                  {btn.icon}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                        <Textarea
                          ref={createTextareaRef(index, 0)}
                          value={block.content.ru}
                          onChange={(e) =>
                            updateBlock(block.id, "content", {
                              ...block.content,
                              ru: e.target.value,
                            })
                          }
                          placeholder="Введите текст на русском..."
                          rows={block.type === "text" ? 6 : 2}
                          className="min-h-20 resize-y"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="font-medium">Текст (UK)</label>
                          {block.type === "text" && (
                            <div className="flex gap-1">
                              {textFormattingButtons.map((btn, i) => (
                                <Button
                                  key={i}
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => insertTextAtCursor("uk", block.id, btn.tag)}
                                  title={btn.title}
                                >
                                  {btn.icon}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                        <Textarea
                          ref={createTextareaRef(index, 1)}
                          value={block.content.uk}
                          onChange={(e) =>
                            updateBlock(block.id, "content", {
                              ...block.content,
                              uk: e.target.value,
                            })
                          }
                          placeholder="Введіть текст українською..."
                          rows={block.type === "text" ? 6 : 2}
                          className="min-h-20 resize-y"
                        />
                      </div>
                    </div>
                  )}

                  {block.type === "image" && (
                    <div className="space-y-4">
                      <label className="font-medium block">Изображение</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          updateBlock(block.id, "file", file);
                          updateBlock(block.id, "imageUrl", URL.createObjectURL(file));
                        }}
                      />

                      {block.imageUrl && (
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground mb-2">Предпросмотр:</p>
                          <Image
                            src={block.imageUrl}
                            className="max-w-full h-auto max-h-80 rounded-lg border object-contain"
                            alt="Preview"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {block.type === "tags" && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="font-medium">Теги (RU)</label>
                        <Input
                          value={block.tags.ru}
                          onChange={(e) =>
                            updateBlock(block.id, "tags", {
                              ...block.tags,
                              ru: e.target.value,
                            })
                          }
                          placeholder="веган, здоровье, питание"
                        />
                        <p className="text-sm text-muted-foreground">
                          Перечисляйте теги через запятую
                        </p>
                      </div>

                      <div className="space-y-3">
                        <label className="font-medium">Теги (UK)</label>
                        <Input
                          value={block.tags.uk}
                          onChange={(e) =>
                            updateBlock(block.id, "tags", {
                              ...block.tags,
                              uk: e.target.value,
                            })
                          }
                          placeholder="веган, здоров'я, харчування"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0  border-t shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {blockTypes.map((b) => (
                  <Button
                    type="button"
                    key={b.type}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 whitespace-nowrap"
                    onClick={() => addBlock(b.type)}
                  >
                    {b.icon}
                    {b.label}
                  </Button>
                ))}
              </div>

              <div className="shrink-0">
                <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[140px]">
                  {isSubmitting ? "Создание..." : "Создать пост"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
