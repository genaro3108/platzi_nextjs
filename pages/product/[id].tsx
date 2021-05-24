import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps } from "next";
import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'
import fetch from 'isomorphic-unfetch'


export const getStaticPaths = async () => {
  const response = await fetch('http://localhost:3000/api/avo');
  const { data: productList }: TAPIAvoResponse = await response.json()
  const paths = productList.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    //fallback
    //Incremental statci generation
    //En false, da 404 para cada pagina que no este en los paths
    fallback:false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const response = await fetch(`http://localhost:3000/api/avo/${id}`);
  return {
    props: {
      product
    }
  }
}

const ProductPage = ({ product }: { product: TProduct }) => {
  return (
    <Layout>
      {product == null ? null : <ProductSummary product={product} />}
    </Layout>
  )
}

export default ProductPage
