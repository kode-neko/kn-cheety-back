import { Schema, model } from 'mongoose';
import ICrud from '../Icrud';

interface IArticle {
  id: string;
  title?: string;
  content?: string | [string];
  tags: [string];
  lang: string;
  author: string;
}

const articleSchema = new Schema<IArticle>({
  title: {
    type: String,
  },
  content: {
    type: Schema.Types.Mixed,
  },
  tags: {
    type: [String],
    required: true,
    default: [],
  },
  lang: {
    type: String,
    required: true,
    default: 'es',
  },
  author: {
    type: String,
    required: true,
  },
}, { id: true });

const articleModel = model('article', articleSchema);

class Article implements ICrud<IArticle> {
  selectByid(id: string): IArticle {

  }

  selectAll(): IArticle {

  }

  select(params: Record<string, unknown>): IArticle {

  }

  insert(ele: T): IArticle {

  }

  update(ele: T): IArticle {

  }

  delete(id: string): void {

  }
}

export default Article;
